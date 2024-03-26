BINARY_NAME=build
TARGET=./
ARGS=

sqlc:
	sqlc generate
	
dev:
	go run . -dev

build:
	GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}-windows.exe ${TARGET} ${ARGS}
	GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}-linux ${TARGET} ${ARGS}
	GOARCH=amd64 GOOS=darwin go build -o ${BINARY_NAME}-darwin ${TARGET} ${ARGS}

build-windows:
	GOARCH=amd64 GOOS=windows go build -o ${BINARY_NAME}-windows.exe ${TARGET} ${ARGS}

build-linux:
	GOARCH=amd64 GOOS=linux go build -o ${BINARY_NAME}-linux ${TARGET} ${ARGS}

build-darwin:
	GOARCH=amd64 GOOS=darwin go build -o ${BINARY_NAME}-darwin ${TARGET} ${ARGS}

clean:
	go clean
	rm -f ${BINARY_NAME}-windows
	rm -f ${BINARY_NAME}-darwin
	rm -f ${BINARY_NAME}-linux