package server

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/UPSxACE/my-diary-api/db"
	"github.com/UPSxACE/my-diary-api/utils"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

func (s *Server) setupDatabase(devMode bool) {
	USERNAME := os.Getenv("POSTGRES_USERNAME")
	PASSWORD := os.Getenv("POSTGRES_PASSWORD")
	HOST := os.Getenv("POSTGRES_HOST")
	DATABASE := os.Getenv("POSTGRES_DATABASE")
	DATABASE_DEV := os.Getenv("POSTGRES_DATABASE_DEV")

	var connectionString string
	if devMode {
		connectionString = fmt.Sprintf("postgres://%v:%v@%v/%v", USERNAME, PASSWORD, HOST, DATABASE_DEV)
	} else {
		connectionString = fmt.Sprintf("postgres://%v:%v@%v/%v", USERNAME, PASSWORD, HOST, DATABASE)
	}

	ctx := context.Background()

	config, err := pgxpool.ParseConfig(connectionString)
	if err != nil {
		log.Fatal(err)
	}
	config.MinConns = 1
	config.MaxConns = 5
	config.MaxConnIdleTime = 10 * time.Second // REVIEW: find ideal amount of time

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		log.Fatal(err)
	}

	s.db = pool
	s.dbContext = ctx
	s.Queries = db.New(s.db)
}

func (s *Server) upgradeDatabase(devMode bool) {
	files, err := os.ReadDir("./sqlc/migrations")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Checking if database is up to date...")

	for _, file := range files {
		migrationName, found := strings.CutSuffix(file.Name(), ".sql")
		if !found {
			log.Fatal("Unexpected file in migrations folder: " + file.Name())
		}

		migrationNumber, err := strconv.Atoi(migrationName)
		if err != nil {
			log.Fatal("Failed converting name to integer: " + file.Name())
		}

		fmt.Println("Checking migration " + migrationName + "...")
		migration, _ := s.Queries.FindOneMigration(s.dbContext, int32(migrationNumber))
		if migration.ID == 0 {
			fmt.Println("Not applied yet.")
			fmt.Println("Applying migration " + migrationName + "...")

			fr, err := utils.OpenSqlFile("./sqlc/migrations/" + file.Name())
			if err != nil {
				log.Fatal(err)
			}

			_, err = fr.ExecuteAll(s.db)
			if err != nil {
				log.Fatal(err)
			}

			timeNow := &pgtype.Timestamp{}
			timeNow.Scan(time.Now()) // NOTE: not error checking
			queryArgs := db.RegisterMigrationParams{Code: int32(migrationNumber), AppliedAt: *timeNow}
			err = s.Queries.RegisterMigration(s.dbContext, queryArgs)
			if err != nil {
				log.Fatal(err)
			}

			fmt.Println("Migration applied successfully")
		} else {
			fmt.Println("Migration already applied.")
		}
	}

	fmt.Println("Database is up to date.")
}
