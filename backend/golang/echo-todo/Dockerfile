FROM golang:alpine
WORKDIR /app
COPY . .
RUN go build -o main cmd/main.go
ENV APP_ENV=production
CMD ["/app/main"]