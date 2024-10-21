package main

import (
	"os"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/fiber-todo/pkg/configs"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/fiber-todo/pkg/controllers"

	"github.com/gofiber/fiber/v2"
)

func main() {
	configs.LoadEnv()

	PORT := os.Getenv("SERVER_PORT")
	f := fiber.New()

	// todo
	f.Get("/api/todos", controllers.GetTodos)
	f.Get("/api/todos/:id", controllers.GetTodoById)
	f.Post("/api/todos", controllers.CreateTodoItem)
	f.Patch("/api/todos/:id", controllers.UpdateTodoItem)
	f.Delete("/api/todos/:id", controllers.DeleteTodoItem)
	f.Listen(":" + PORT)
}
