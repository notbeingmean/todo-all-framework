package main

import (
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/gin-todo/pkg/configs"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/gin-todo/pkg/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	db := configs.DB()
	r := gin.Default()
	controllers.Register(r, db)
	r.Run()
}
