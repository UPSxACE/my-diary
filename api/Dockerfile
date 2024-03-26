FROM golang:latest

WORKDIR /app

COPY go.mod go.sum .env ./
RUN go mod download
RUN go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest

COPY sqlc ./sqlc
COPY sqlc.yaml .
RUN sqlc generate

COPY *.go ./
COPY . ./

RUN CGO_ENABLED=0 GOOS=linux go build -o /my-diary-api

#ENV

EXPOSE 1323

CMD ["/my-diary-api"]