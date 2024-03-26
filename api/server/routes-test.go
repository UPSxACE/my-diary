package server

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

func (s *Server) postBlacklistTokenRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	s.tokenBlacklist[claims.UserId] = time.Now()
	return c.NoContent(http.StatusOK)
}

func (s *Server) getTestTokenRoute(c echo.Context) error {
	token := c.Get("user").(*jwt.Token)
	claims := token.Claims.(*jwtCustomClaims)

	id := claims.UserId
	permissions := claims.Permissions
	expiresAt := claims.ExpiresAt

	return c.JSON(http.StatusOK, echo.Map{
		"id":          id,
		"permissions": permissions,
		"expiresAt":   expiresAt,
	})
}
