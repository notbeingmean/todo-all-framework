FROM golang:alpine
WORKDIR /app
COPY . .
ENV APP_ENV=production
RUN go build -o main cmd/main.go
CMD ["/app/main"]