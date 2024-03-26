package main

import (
	"flag"
	"log"

	"github.com/UPSxACE/my-diary-api/server"
	"github.com/joho/godotenv"
)
func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}

	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	devFlag := flag.Bool("dev", false, "Run server on developer mode")
	flag.Parse()

	sv := server.NewServer(*devFlag)

	return sv.Start(":1323")
}
