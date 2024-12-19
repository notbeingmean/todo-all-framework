package com.todoall.spring_todo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todoall.spring_todo.entities.Todo;
import com.todoall.spring_todo.repository.TodoRepository;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    public Todo getTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        return new Todo(todo.getId(), todo.getTitle(), todo.getCompleted());
    }

    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    public Todo updateTodo(Long id, Todo todo) {
        Todo findTodo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        findTodo.setTitle(todo.getTitle());
        findTodo.setCompleted(todo.getCompleted());
        Todo updatedTodo = todoRepository.save(findTodo);
        return new Todo(updatedTodo.getId(), updatedTodo.getTitle(), updatedTodo.getCompleted());
    }

    public void deleteTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
        todoRepository.delete(todo);
    }
}
