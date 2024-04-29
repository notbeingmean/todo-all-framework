package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/mux-todo/internal/models"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func RegisterTodoHandler(r *mux.Router, db *gorm.DB) {
	h := handler{DB: db}
	db.AutoMigrate(&models.Todo{})
	r.HandleFunc("/todos", h.GetTodos).Methods("GET")
	r.HandleFunc("/todos", h.CreateTodo).Methods("POST")
	r.HandleFunc("/todos/{id}", h.GetTodo).Methods("GET")
	r.HandleFunc("/todos/{id}", h.UpdateTodo).Methods("PUT")
	r.HandleFunc("/todos/{id}", h.DeleteTodo).Methods("DELETE")
}

func (h *handler) GetTodos(w http.ResponseWriter, r *http.Request) {
	var todos []models.Todo
	h.DB.Find(&todos)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(todos)

}

func (h *handler) CreateTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo
	json.NewDecoder(r.Body).Decode(&todo)
	h.DB.Create(&todo)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("Todo Created")
}

func (h *handler) GetTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo
	vars := mux.Vars(r)
	id := vars["id"]
	h.DB.First(&todo, id)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(todo)
}

func (h *handler) UpdateTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo

	vars := mux.Vars(r)
	id := vars["id"]
	h.DB.First(&todo, id)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Todo Updated")
}

func (h *handler) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	var todo models.Todo

	vars := mux.Vars(r)
	id := vars["id"]
	h.DB.Delete(&todo, id)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Todo Deleted")
}
