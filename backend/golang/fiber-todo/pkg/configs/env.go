package configs

import (
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
	APP_ENV := os.Getenv("APP_ENV")
	if APP_ENV == "production" {
		godotenv.Load(".env")
	}
	godotenv.Load(".env.local")
}
