package server

import (
	"log"
	"reflect"
	"strings"

	"github.com/dlclark/regexp2"
	"github.com/go-playground/validator/v10"
)

// Alphanumeric with spaces
var alphanumspaceRegex = regexp2.MustCompile(`^[a-zA-Z0-9\s]+$`,0);
// Allows Alphanumeric and _.- if it's not on start or end; max 32 of length
var usernameRegex = regexp2.MustCompile(`^[a-z0-9][a-z0-9_.-]{0,32}[a-z0-9]$`, 0)
// Matches uncommon email ids too
var emailRegex = regexp2.MustCompile(`^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$`, 0)
// Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long, max 64 characters
var passwordRegex = regexp2.MustCompile(`(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,64}$`, 0)

func (s *Server) setupValidator() {
	s.validator = validator.New(validator.WithRequiredStructEnabled())

	// register function to get tag name from json tags.
	s.validator.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})

	// Register regex validation functions
	errs := s.validator.RegisterValidation("alphanumspace", func(fl validator.FieldLevel) bool {
		value := fl.Field().String()
		match, _ := alphanumspaceRegex.MatchString(value)
		return match
	})
	if errs != nil {
		log.Fatal(errs)
	}
	errs = s.validator.RegisterValidation("username", func(fl validator.FieldLevel) bool {
		value := fl.Field().String()
		match, _ := usernameRegex.MatchString(value)
		return match
	})
	if errs != nil {
		log.Fatal(errs)
	}
	errs = s.validator.RegisterValidation("email", func(fl validator.FieldLevel) bool {
		value := fl.Field().String()
		match, _ := emailRegex.MatchString(value)
		return match
	})
	if errs != nil {
		log.Fatal(errs)
	}
	errs = s.validator.RegisterValidation("password", func(fl validator.FieldLevel) bool {
		value := fl.Field().String()
		match, _ := passwordRegex.MatchString(value)
		return match
	})
	if errs != nil {
		log.Fatal(errs)
	}
}
