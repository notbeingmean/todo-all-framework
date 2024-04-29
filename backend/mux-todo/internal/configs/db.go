package configs

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func InitialDatabase() *gorm.DB {
	database_str := "host=" + Envs.PostgresHost + " port=" + Envs.PostgresPort + " user=" + Envs.PostgresUser + " dbname=" + Envs.PostgresDB + " password=" + Envs.PostgresPassword + " sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(database_str), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	return db
}
