package server

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v4"
	"github.com/labstack/echo/v4"
)

const TOKEN_DURATION = time.Hour * 72

/** JWT custom claim */
type jwtCustomClaims struct {
	Username    string `json:"username"`
	UserId      int    `json:"userId"`
	Permissions int    `json:"permissions"`
	jwt.RegisteredClaims
}

/** JWT revoke */
type userId = int
type revokeTime = time.Time
type sessionRevokeList = map[userId]revokeTime

func (s *Server) setupJwt() {
	SECRET := os.Getenv("JWT_SECRET")
	s.jwtConfig = echojwt.Config{
		TokenLookup: "cookie:authToken,query:authToken",
		NewClaimsFunc: func(c echo.Context) jwt.Claims {
			return new(jwtCustomClaims)
		},
		SigningKey: []byte(SECRET),
	}

	s.tokenBlacklist = map[int]time.Time{}
}

func (s *Server) jwtMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	blacklistWrapper := func(c echo.Context) error {
		token := c.Get("user").(*jwt.Token)
		claims := token.Claims.(*jwtCustomClaims)

		id := claims.UserId
		issuedAt := claims.IssuedAt

		revokeTime := s.tokenBlacklist[id]
		if !revokeTime.IsZero() {
			revokedAtMs := revokeTime.UnixMilli()
			issuedAtMs := issuedAt.UnixMilli()
			nowMs := time.Now().UnixMilli()
			tokenDurationMs := TOKEN_DURATION.Milliseconds()

			if issuedAtMs < revokedAtMs {
				return echo.ErrUnauthorized
			}
			if nowMs > revokedAtMs+tokenDurationMs {
				s.tokenBlacklist[id] = time.Time{}
			}
		}

		return next(c)
	}

	authMiddleware := echojwt.WithConfig(s.jwtConfig)

	return authMiddleware(blacklistWrapper)
}

func (s *Server) guestMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		hasToken := c.Request().Header.Get("Authorization") != ""

		if hasToken {
			return echo.ErrForbidden
		}

		return next(c)
	}
}
