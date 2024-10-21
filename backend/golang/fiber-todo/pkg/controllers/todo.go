package controllers

import (
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/fiber-todo/pkg/configs"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/fiber-todo/pkg/models"

	"github.com/gofiber/fiber/v2"
)

func GetTodos(c *fiber.Ctx) error {
	DB := configs.DB()

	var todos []models.Todo

	if result := DB.Order("id ASC").Find(&todos); result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}
	return c.JSON(todos)
}

func GetTodoById(c *fiber.Ctx) error {
	id := c.Params("id")
	DB := configs.DB()

	var todo models.Todo

	if result := DB.First(&todo, id); result.Error != nil {
		return c.Status(404).SendString(result.Error.Error())
	}
	return c.JSON(todo)
}

func CreateTodoItem(c *fiber.Ctx) error {
	DB := configs.DB()

	var todo models.Todo

	if err := c.BodyParser(&todo); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	if result := DB.Create(&todo); result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}
	return c.JSON(todo)
}

func UpdateTodoItem(c *fiber.Ctx) error {
	id := c.Params("id")
	DB := configs.DB()

	var todo models.Todo

	if result := DB.First(&todo, id); result.Error != nil {
		return c.Status(404).SendString(result.Error.Error())
	}

	if err := c.BodyParser(&todo); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	if result := DB.Save(&todo); result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}
	return c.JSON(todo)
}

func DeleteTodoItem(c *fiber.Ctx) error {
	id := c.Params("id")
	DB := configs.DB()

	var todo models.Todo

	if result := DB.Delete(&todo, id); result.Error != nil {
		return c.Status(500).SendString(result.Error.Error())
	}
	return c.SendString("Todo item successfully deleted")
}
