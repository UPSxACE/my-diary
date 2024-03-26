package utils

import (
	"time"
	// "github.com/jackc/pgx/v5/pgtype"
)

const LAYOUT = "2006-01-02T15:04:05.999999Z07:00"

func ParsePgxTimeJson(pgxTime string) (time.Time, error) {
	// Parse the timestamp string into a time.Time object
	timestamp, err := time.Parse(time.RFC3339Nano, pgxTime)
	if err != nil {
		return time.Time{}, err
	}

	return timestamp, nil
}

func ParsePgxTimeJsonSafe(pgxTime string, fallback string) (time.Time, error) {
	timestamp, err := ParsePgxTimeJson(pgxTime)
	if err != nil {
		timestamp, err := ParsePgxTimeJson(fallback)
		if err != nil {
			return time.Time{}, err
		}
		return timestamp, nil
	}
	return timestamp, nil
}