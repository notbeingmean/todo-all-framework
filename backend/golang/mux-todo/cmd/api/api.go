package api

import (
	"log"
	"net/http"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/mux-todo/internal/handlers"
	"github.com/gorilla/mux"
	"gorm.io/gorm"
)

type APIServer struct {
	address string
	DB      *gorm.DB
}

func NewAPIServer(address string, db *gorm.DB) *APIServer {
	return &APIServer{
		address: address,
		DB:      db,
	}
}

func (s *APIServer) Run() error {
	r := mux.NewRouter()
	handlers.RegisterTodoHandler(r, s.DB)

	log.Println("Listening on", s.address)

	return http.ListenAndServe(":8080", r)
}
