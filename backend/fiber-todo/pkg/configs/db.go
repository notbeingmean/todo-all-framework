package configs

import (
	"fmt"
	"os"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/fiber-todo/pkg/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DB() *gorm.DB {
	DB := os.Getenv("DB")

	db, err := gorm.Open(postgres.Open(DB), &gorm.Config{})
	if err != nil {
		fmt.Println("Error connecting to database")
	}

	db.AutoMigrate(&models.Todo{})
	return db
}
