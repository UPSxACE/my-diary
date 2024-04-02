# MyDiary
![version](https://img.shields.io/badge/version-v1.0.0--alpha-blue)

MyDiary is an intuitive fully open-source web application developed with Golang and Nextjs, for users who want a free and minimalistic alternative to keep their notes organized.
With a user-friendly interface, MyDiary allows you to effortlessly jot down and save your thoughts, ideas, and important information.

This is the Golang API repository in which the backend of the application is coded.
Other repos related to the project:
- [Central docker repository](https://github.com/UPSxACE/my-diary)
- [NextJS repository](https://github.com/UPSxACE/my-diary-web)

## Table of Contents
- [Development Prerequisites](#development-prerequisites)
- [Installation and Setup](#installation-and-setup)

## Development Prerequisites
Ensure you have the following tools and dependencies installed on your system before diving into MyDiary Api development:
* Go
* Makefile
* Postgres
* Create a database for the app and run the sql queries in `sqlc/initial_schema.sql`

## Installation and Setup
### Clone repository
```bash
git clone https://github.com/UPSxACE/my-diary-api.git && cd my-diary-api
```

### Install golang dependencies
```bash
go mod tidy
```

### Install sqlc command line
```bash
go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
```

### Generate db module
```bash
sqlc generate
```

### Create .env file at the root of the project
```env
CORS_ORIGIN_1=<URL USED FOR THE WEB APP>
CORS_ORIGIN_2=<URL USED FOR THE API APP>
COOKIE_DOMAIN=<DOMAIN VALUE USED FOR THE SESSION COOKIE>
POSTGRES_USERNAME=<POSTGRES USERNAME>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_HOST=postgres_db:5432
POSTGRES_DATABASE=<DATABASE NAME>
JWT_SECRET=<JWT SECRET KEY>
```

### Run app in development mode
```
make dev
```

### Build executables
```
make build
# or
make build-windows
make build-linux
make build-darwin
```

### Clean executables
```
make clean
```
