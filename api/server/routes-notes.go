package server

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/UPSxACE/my-diary-api/db"
	"github.com/UPSxACE/my-diary-api/utils"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

const NOTES_PG_SIZE = 16

type GetNotesBody struct {
	Pagination Pagination        `json:"pagination"`
	Data       []db.ListNotesRow `json:"data"`
}

type PostNotesBody struct {
	Title      string `json:"title" validate:"required,max=254"`
	Content    string `json:"content" validate:"required,max=131070"`
	ContentRaw string `json:"content_raw" validate:"required,max=131070"`
}

type PutNotesBody struct {
	Title      string `json:"title" validate:"max=254"`
	Content    string `json:"content" validate:"max=131070"`
	ContentRaw string `json:"content_raw" validate:"max=131070"`
}

type NoteDtoAuthor struct {
	ID        int32  `json:"id"`
	Username  string `json:"username"`
	AvatarUrl string `json:"avatar_url"`
}

type NoteDtoNote struct {
	ID         int32            `json:"id"`
	Title      string           `json:"title"`
	Content    string           `json:"content"`
	ContentRaw string           `json:"content_raw"`
	Views      int32            `json:"views"`
	LastreadAt pgtype.Timestamp `json:"lastread_at"`
	CreatedAt  pgtype.Timestamp `json:"created_at"`
	UpdatedAt  pgtype.Timestamp `json:"updated_at"`
}

type NoteDto struct {
	Author NoteDtoAuthor `json:"author"`
	Note   NoteDtoNote   `json:"note"`
}

func (s *Server) getNotesRoute(c echo.Context) error {
	// TODO: transaction
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId

	noteCount, err := s.Queries.CountNotes(c.Request().Context(), int32(jwtId))
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	p := db.ListNotesParams{
		AuthorID: int32(jwtId),
		Limit:    NOTES_PG_SIZE + 1,
	}

	// Optional parameter "search"
	searchParam := c.QueryParam("search")
	if searchParam != "" {
		p.Search = true
		p.SearchValue = searchParam
	}

	// Optional parameter "cursor"
	cursorParam := c.QueryParam("cursor")
	var decodedCursor utils.Cursor
	var decodedCursorTime time.Time
	var emptyCursor bool = cursorParam == ""
	if !emptyCursor {
		decodedCursor, err = utils.DecodeCursor(cursorParam)
		if err != nil {
			return echo.ErrBadRequest
		}
		if decodedCursor.MainType == "datetime" {
			decodedCursorTime, err = decodedCursor.StringToTime()
			if err != nil {
				return echo.ErrBadRequest
			}
		}
		p.CursorID = decodedCursor.Id
	}

	// Optional parameter "order"
	orderParam := c.QueryParam("order")

	var nextCursorIsTime bool
	switch orderParam {
	case "az":
		p.OrderTitleAsc = true
		if !emptyCursor {
			p.CursorTitleAsc = true
			p.Title = decodedCursor.Main
		}
	case "za":
		p.OrderTitleDesc = true
		if !emptyCursor {
			p.CursorTitleDesc = true
			p.Title = decodedCursor.Main
		}
	case "oldest":
		nextCursorIsTime = true

		p.OrderCrtAsc = true
		if !emptyCursor && decodedCursor.MainType == "datetime" {
			p.CursorCrtAsc = true

			cursorPgTime := pgtype.Timestamp{}
			err = cursorPgTime.Scan(decodedCursorTime)
			if err != nil {
				// NOTE: Code should never arrive here I think
				return echo.ErrBadRequest
			}
			p.CreatedAt = cursorPgTime
		}
	default: // default is "latest"
		nextCursorIsTime = true

		p.OrderCrtDesc = true
		if !emptyCursor && decodedCursor.MainType == "datetime" {
			p.CursorCrtDesc = true

			cursorPgTime := pgtype.Timestamp{}
			err = cursorPgTime.Scan(decodedCursorTime)
			if err != nil {
				// NOTE: Code should never arrive here I think
				return echo.ErrBadRequest
			}
			p.CreatedAt = cursorPgTime
		}
	}

	// Fetch
	noteModels, err := s.Queries.ListNotes(context.Background(), p)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	// Set next cursor
	var nextCursor string

	modelCount := len(noteModels)
	if modelCount == NOTES_PG_SIZE+1 {
		if nextCursorIsTime {
			nextCursorMainByte, err := noteModels[modelCount-1].CreatedAt.Time.MarshalText()
			if err != nil {
				fmt.Println(err)
				return echo.ErrInternalServerError
			}
			nextCursor = utils.EncodeCursor(noteModels[modelCount-1].ID, string(nextCursorMainByte), "datetime")
		}
		if !nextCursorIsTime {
			nextCursor = utils.EncodeCursor(noteModels[modelCount-1].ID, noteModels[modelCount-1].Title, "string")
		}

		noteModels = noteModels[0:NOTES_PG_SIZE]
	}
	if modelCount != NOTES_PG_SIZE+1 {
		nextCursor = ""
	}

	// Response
	pagination := Pagination{
		TotalRecords: int(noteCount),
		PageSize:     NOTES_PG_SIZE,
		Cursor:       nextCursor,
	}

	return c.JSON(http.StatusOK, GetNotesBody{
		Pagination: pagination,
		Data:       noteModels,
	})
}

func (s *Server) getNotesIdRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId
	jwtPerms := claims.Permissions

	idParam := c.Param("id")

	idParamInt, err := strconv.Atoi(idParam)
	if err != nil {
		return echo.ErrBadRequest
	}

	noteModel, err := s.Queries.GetNoteById(c.Request().Context(), int32(idParamInt))
	if err != nil {
		return echo.ErrNotFound
	}
	if noteModel.Note.AuthorID != int32(jwtId) && jwtPerms != 1 {
		return echo.ErrNotFound
	}

	noteDto := NoteDto{
		Author: NoteDtoAuthor{
			ID:        noteModel.Note.AuthorID,
			Username:  noteModel.User.Username,
			AvatarUrl: noteModel.User.AvatarUrl.String,
		},
		Note: NoteDtoNote{
			ID:         noteModel.Note.ID,
			Title:      noteModel.Note.Title,
			Content:    noteModel.Note.Content,
			ContentRaw: noteModel.Note.ContentRaw,
			Views:      noteModel.Note.Views,
			LastreadAt: noteModel.Note.LastreadAt,
			CreatedAt:  noteModel.Note.CreatedAt,
			UpdatedAt:  noteModel.Note.UpdatedAt,
		},
	}

	return c.JSON(http.StatusOK, noteDto)
}

func (s *Server) putNotesIdRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId
	jwtPerms := claims.Permissions

	idParam := c.Param("id")

	idParamInt, err := strconv.Atoi(idParam)
	if err != nil {
		return echo.ErrBadRequest
	}

	noteModel, err := s.Queries.GetNoteById(c.Request().Context(), int32(idParamInt))
	if err != nil {
		return echo.ErrNotFound
	}
	if noteModel.Note.AuthorID != int32(jwtId) && jwtPerms != 1 {
		return echo.ErrNotFound
	}

	// Read body
	noteBody := &PutNotesBody{}

	if err := c.Bind(noteBody); err != nil {
		return echo.ErrBadRequest
	}

	// Validate fields
	err = s.validator.Struct(noteBody)
	if err != nil {
		errs := err.(validator.ValidationErrors)
		if len(errs) > 0 {
			return c.JSON(http.StatusBadRequest, echo.Map{"field": errs[0].Field()})
		}
	}

	// Save
	// TODO: Transaction
	// TODO: Register note_change(?)
	params := db.UpdateNoteParams{
		ID: int32(idParamInt),
	}
	if noteBody.Title != "" {
		params.Title = noteBody.Title
	} else {
		params.Title = noteModel.Note.Title
	}
	if noteBody.Content != "" {
		params.Content = noteBody.Content
	} else {
		params.Content = noteModel.Note.Content
	}
	if noteBody.ContentRaw != "" {
		params.ContentRaw = noteBody.ContentRaw
	} else {
		params.ContentRaw = noteModel.Note.ContentRaw
	}

	err = s.Queries.UpdateNote(c.Request().Context(), params)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func (s *Server) deleteNotesIdRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId
	jwtPerms := claims.Permissions

	idParam := c.Param("id")

	idParamInt, err := strconv.Atoi(idParam)
	if err != nil {
		return echo.ErrBadRequest
	}

	noteModel, err := s.Queries.GetNoteById(c.Request().Context(), int32(idParamInt))
	if err != nil {
		return echo.ErrNotFound
	}
	if noteModel.Note.AuthorID != int32(jwtId) && jwtPerms != 1 {
		return echo.ErrNotFound
	}

	err = s.Queries.DeleteNote(c.Request().Context(), noteModel.Note.ID)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func (s *Server) postNotesRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId

	// Read body
	noteBody := &PostNotesBody{}

	if err := c.Bind(noteBody); err != nil {
		return echo.ErrBadRequest
	}

	// Validate fields
	err := s.validator.Struct(noteBody)
	if err != nil {
		errs := err.(validator.ValidationErrors)
		if len(errs) > 0 {
			return c.JSON(http.StatusBadRequest, echo.Map{"field": errs[0].Field()})
		}
	}

	// Save
	// TODO: Transaction
	// TODO: Register note_change(?)
	params := db.CreateNoteParams{AuthorID: int32(jwtId), Title: noteBody.Title, Content: noteBody.Content, ContentRaw: noteBody.ContentRaw}

	id, err := s.Queries.CreateNote(c.Request().Context(), params)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(http.StatusCreated, id)
}
