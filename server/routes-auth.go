package server

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/UPSxACE/my-diary-api/db"
	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

const USER_DEFAULT_ROLE_ID = 1
const USER_DEFAULT_PERMISSIONS = 0
const USER_DEFAULT_AVATAR_URL = "/default-avatar.png"

func (s *Server) postLoginRoute(c echo.Context) error {
	type Login struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	login := &Login{}

	if err := c.Bind(login); err != nil {
		return echo.ErrBadRequest
	}

	userAuth, err := s.Queries.GetUserAuthByUsername(c.Request().Context(), login.Username)
	if err != nil {
		return echo.ErrNotFound
	}

	match, _ := ComparePasswordAndHash(login.Password, userAuth.Password)
	if !match {
		return echo.ErrBadRequest
	}

	// Set claims
	issuedAt := time.Now()
	expiresAt := time.Now().Add(TOKEN_DURATION)

	permissions := 0
	if userAuth.RoleID == 2 {
		permissions = 1
	}

	claims := jwtCustomClaims{
		userAuth.Username,
		int(userAuth.ID),
		permissions,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(issuedAt),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and to send as response.
	signedJwt, err := token.SignedString(s.jwtConfig.SigningKey)
	if err != nil {
		return err
	}

	// Set myDiaryToken cookie
	cookie := new(http.Cookie)
	cookie.Name = "myDiaryToken"
	cookie.Value = signedJwt
	cookie.Expires = expiresAt
	cookie.HttpOnly = true
	cookie.Path = "/"
	cookie.Domain = os.Getenv("COOKIE_DOMAIN")
	c.SetCookie(cookie)

	return c.NoContent(http.StatusOK)
}

type PostRegisterBody struct {
	Username string `json:"username" validate:"required,username"`
	Name     string `json:"name" validate:"required,min=4,max=64,alphanumspace"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,password"`
}

func (s *Server) postRegisterRoute(c echo.Context) error {
	// Read body
	register := &PostRegisterBody{}

	if err := c.Bind(register); err != nil {
		return echo.ErrBadRequest
	}

	// Validate fields
	err := s.validator.Struct(register)
	if err != nil {
		errs := err.(validator.ValidationErrors)
		if len(errs) > 0 {
			return c.JSON(http.StatusBadRequest, echo.Map{"field": errs[0].Field()})
		}
	}

	// Save
	hashedPassword, err := HashPassword(register.Password)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	namePg := &pgtype.Text{}
	namePg.Scan(register.Name) // NOTE: not error checking
	urlPg := &pgtype.Text{}
	urlPg.Scan(USER_DEFAULT_AVATAR_URL) // NOTE: not error checking

	params := db.CreateUserParams{
		Username:  register.Username,
		Email:     register.Email,
		FullName:  *namePg,
		AvatarUrl: *urlPg,
		RoleID:    USER_DEFAULT_ROLE_ID,
		Password:  hashedPassword,
	}
	id, err := s.Queries.CreateUser(c.Request().Context(), params)
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	// Set claims
	issuedAt := time.Now()
	expiresAt := time.Now().Add(TOKEN_DURATION)
	claims := jwtCustomClaims{
		params.Username,
		int(id),
		USER_DEFAULT_PERMISSIONS,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(issuedAt),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and to send as response.
	signedJwt, err := token.SignedString(s.jwtConfig.SigningKey)
	if err != nil {
		return err
	}

	// Set myDiaryToken cookie
	cookie := new(http.Cookie)
	cookie.Name = "myDiaryToken"
	cookie.Value = signedJwt
	cookie.Expires = expiresAt
	cookie.HttpOnly = true
	cookie.Path = "/"
	cookie.Domain = os.Getenv("COOKIE_DOMAIN")
	c.SetCookie(cookie)

	return c.NoContent(http.StatusCreated)
}
