package com.todoall.spring_todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todoall.spring_todo.entities.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
