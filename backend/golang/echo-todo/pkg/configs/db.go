package configs

import (
	"os"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/echo-todo/pkg/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DB() *gorm.DB {
	LoadEnv()

	dns := "host=" + os.Getenv("POSTGRES_HOST") + " user=" + os.Getenv("POSTGRES_USER") + " password=" + os.Getenv("POSTGRES_PASSWORD") + " dbname=" + os.Getenv("POSTGRES_DB") + " port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&models.Todo{})
	return db
}
