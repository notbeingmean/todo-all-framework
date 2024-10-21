package main

import (
	"fmt"

	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/mux-todo/cmd/api"
	"github.com/NOTMEAN11/todo-all-framework/tree/master/backend/mux-todo/internal/configs"
)

func main() {
	db := configs.InitialDatabase()
	server := api.NewAPIServer(fmt.Sprintf(":%s", configs.Envs.ServerPort), db)

	if err := server.Run(); err != nil {
		panic(err)
	}
}
