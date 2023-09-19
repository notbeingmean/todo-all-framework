package controllers

import (
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/gin-todo/pkg/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

// Register
func Register(r *gin.Engine, db *gorm.DB) {
	h := handler{DB: db}

	r.GET("/todos", h.GetTodos)
	r.POST("/todos", h.CreateTodo)
	r.GET("/todos/:id", h.GetTodo)
	r.PATCH("/todos/:id", h.UpdateTodo)
	r.DELETE("/todos/:id", h.DeleteTodo)
}

func (h handler) GetTodos(c *gin.Context) {
	var todos []models.Todo
	if result := h.DB.Order("id ASC").Find(&todos); result.Error != nil {
		c.AbortWithStatus(404)
	}

	c.JSON(200, todos)
}

func (h handler) CreateTodo(c *gin.Context) {
	var todo models.Todo
	if err := c.BindJSON(&todo); err != nil {
		c.AbortWithStatus(400)
	}

	if result := h.DB.Create(&todo); result.Error != nil {
		c.AbortWithStatus(404)
	}

	c.JSON(200, todo)
}

func (h handler) GetTodo(c *gin.Context) {
	var todo models.Todo
	if result := h.DB.First(&todo, c.Param("id")); result.Error != nil {
		c.AbortWithStatus(404)
	}

	c.JSON(200, todo)
}

func (h handler) UpdateTodo(c *gin.Context) {
	var todo models.Todo
	if result := h.DB.First(&todo, c.Param("id")); result.Error != nil {
		c.AbortWithStatus(404)
	}

	if err := c.BindJSON(&todo); err != nil {
		c.AbortWithStatus(400)
	}

	if result := h.DB.Save(&todo); result.Error != nil {
		c.AbortWithStatus(404)
	}

	c.JSON(200, todo)
}

func (h handler) DeleteTodo(c *gin.Context) {
	var todo models.Todo
	if result := h.DB.First(&todo, c.Param("id")); result.Error != nil {
		c.AbortWithStatus(404)
	}

	if result := h.DB.Delete(&todo); result.Error != nil {
		c.AbortWithStatus(404)
	}

	c.Status(204)
}
