package server

import "github.com/labstack/echo/v4"

type Pagination struct {
	TotalRecords int    `json:"total_records"`
	PageSize     int    `json:"page_size"`
	Cursor       string `json:"cursor"`
}

func (s *Server) setRoutes(devMode bool) {
	// SECTION - Public Routes
	// - Index
	s.router.GET("/ping", func(c echo.Context) error {
		return c.JSON(200, "pong")
	})

	// SECTION - Guest Routes
	routeIndexGuest := s.router.Group("/", s.guestMiddleware)
	// - Auth
	routeIndexGuest.POST("login", s.postLoginRoute)
	routeIndexGuest.POST("register", s.postRegisterRoute)

	// Private Routes
	routeIndexPrivate := s.router.Group("/", s.jwtMiddleware)
	// - Index
	routeIndexPrivate.GET("profile", s.getProfileRoute)
	// - Test
	if devMode {
		routeIndexPrivate.POST("blacklist-token", s.postBlacklistTokenRoute)
		routeIndexPrivate.GET("test-token", s.getTestTokenRoute)
	}
	// - Notes
	routeNotePrivate := s.router.Group("/notes", s.jwtMiddleware)
	routeNotePrivate.GET("", s.getNotesRoute)
	routeNotePrivate.POST("", s.postNotesRoute)
	routeNotePrivate.GET("/:id", s.getNotesIdRoute)
	routeNotePrivate.PUT("/:id", s.putNotesIdRoute)
	routeNotePrivate.DELETE("/:id", s.deleteNotesIdRoute)

	// SECTION - Moderation Routes
}
