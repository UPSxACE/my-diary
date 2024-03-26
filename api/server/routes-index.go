package server

import (
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

type UserProfileDto struct {
	Username      string `json:"username"`
	Email         string `json:"email"`
	AvatarUrl     string `json:"avatar_url"`
	FullName      string `json:"fullName"`
	SkipTutorials bool   `json:"skip_tutorials"`
	Role          string `json:"role"`
	Permissions   int    `json:"permissions"`
}

func (s *Server) getProfileRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	jwtId := claims.UserId
	jwtPermissions := claims.Permissions

	profileModel, err := s.Queries.GetUserProfileById(c.Request().Context(), int32(jwtId))
	if err != nil {
		fmt.Println(err)
		return echo.ErrInternalServerError
	}

	var role string
	if jwtPermissions == 0 {
		role = "User"
	}
	if jwtPermissions == 1 {
		role = "Admin"
	}

	profile := &UserProfileDto{
		Username:      profileModel.Username,
		Email:         profileModel.Email,
		AvatarUrl:     profileModel.AvatarUrl.String,
		FullName:      profileModel.FullName.String,
		SkipTutorials: profileModel.SkipTutorials,
		Role:          role,
		Permissions:   jwtPermissions,
	}

	return c.JSON(http.StatusOK, profile)
}
