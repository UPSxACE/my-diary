package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/UPSxACE/my-diary-api/server"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("NOTE: It was not possible to load the .env file.")
		fmt.Println("You can ignore this message if you're currently in a production environment.")
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
