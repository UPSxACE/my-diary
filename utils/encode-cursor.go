package utils

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"time"
)

type Cursor struct {
	Id       int32
	Main     string
	MainType string // string, datetime
}

func (cr *Cursor) StringToTime() (time time.Time, err error) {
	if cr.MainType != "datetime" {
		return time, errors.New("the type of main cursor is not datetime")
	}

	time, err = ParsePgxTimeJson(cr.Main)
	return time, err
}

func EncodeCursor(cursorId int32, cursorMainStr string, mainType string) (encodedCursor string) {
	cursor := Cursor{cursorId, cursorMainStr, mainType}

	cursorJson, err := json.Marshal(cursor)
	if err != nil {
		panic(err)
	}

	cursorB64 := base64.StdEncoding.EncodeToString(cursorJson)
	return cursorB64
}

func DecodeCursor(encodedCursor string) (decodedCursor Cursor, err error) {
	decodedJson, err := base64.StdEncoding.DecodeString(encodedCursor)
	if err != nil {
		return Cursor{}, err
	}

	decodedCursor = Cursor{}
	err = json.Unmarshal(decodedJson, &decodedCursor)
	if err != nil {
		return Cursor{}, err
	}

	return decodedCursor, nil
}
