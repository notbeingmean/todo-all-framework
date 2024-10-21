package models

type Todo struct {
	ID        int    `json:"id" gorm:"primaryKey"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}
