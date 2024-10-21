package controllers

import (
	"net/http"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/echo-todo/pkg/configs"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/echo-todo/pkg/models"
	"github.com/labstack/echo/v4"
)

func GetTodos(c echo.Context) error {
	db := configs.DB()
	var todos []models.Todo
	db.Order("id ASC").Find(&todos)
	return c.JSON(http.StatusOK, todos)
}

func GetTodoById(c echo.Context) error {
	db := configs.DB()
	id := c.Param("id")
	var todo models.Todo
	db.First(&todo, id)
	return c.JSON(http.StatusOK, todo)
}

func CreateTodo(c echo.Context) error {
	db := configs.DB()
	var todo models.Todo
	if err := c.Bind(&todo); err != nil {
		return err
	}

	db.Create(&todo)

	return c.JSON(http.StatusOK, todo)
}

func UpdateTodoById(c echo.Context) error {
	db := configs.DB()
	id := c.Param("id")
	var todo models.Todo
	db.First(&todo, id)
	c.Bind(&todo)
	db.Save(&todo)
	return c.JSON(http.StatusOK, todo)
}

func DeleteTodoById(c echo.Context) error {
	db := configs.DB()
	id := c.Param("id")
	var todo models.Todo
	db.First(&todo, id)
	db.Delete(&todo)
	return c.JSON(http.StatusOK, todo)
}
