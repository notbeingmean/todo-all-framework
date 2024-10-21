package main

import (
	"os"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/echo-todo/pkg/configs"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/echo-todo/pkg/controllers"
	"github.com/labstack/echo/v4"
)

func main() {
	configs.LoadEnv()
	SERVER_PORT := os.Getenv("SERVER_PORT")

	e := echo.New()

	// Routes
	e.GET("/api/todos", controllers.GetTodos)
	e.GET("/api/todos/:id", controllers.GetTodoById)
	e.POST("/api/todos", controllers.CreateTodo)
	e.PATCH("/api/todos/:id", controllers.UpdateTodoById)
	e.DELETE("/api/todos/:id", controllers.DeleteTodoById)

	e.Logger.Fatal(e.Start(":" + SERVER_PORT))
}
