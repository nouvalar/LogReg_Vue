<template>
    <div class="todo-container">
      <h1>Todo List</h1>
      <div class="input-container">
        <input v-model="newTodo" class="todo-input" placeholder="Add a new todo" />
        <button @click="addNewTodo" class="add-button">Add ToDo</button>
      </div>
      <ul class="todo-list">
        <li v-for="(todo, index) in todos" :key="index" class="todo-item">
          <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
          <button @click="toggleTodo(index)" class="todo-button">{{ todo.completed ? 'Undo' : 'Complete' }}</button>
          <button @click="deleteTodo(index)" class="todo-button">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTodoStore } from '../../stores/todoStore';
  
  const newTodo = ref('');
  const todoStore = useTodoStore();
  const { todos, addTodo, toggleTodo, deleteTodo } = todoStore;
  
  const addNewTodo = () => {
    if (newTodo.value.trim() !== '') {
      addTodo(newTodo.value);
      newTodo.value = '';
    }
  };
  </script>
  
  <style scoped>
  .todo-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .input-container {
    display: flex;
    align-items: center;
  }
  
  .todo-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  .add-button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .todo-list {
    margin-top: 20px;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .todo-item:last-child {
    border-bottom: none;
  }
  
  .todo-item span {
    flex: 1;
  }
  
  .completed {
    text-decoration: line-through;
  }
  
  .todo-button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .todo-button:first-of-type {
    background-color: #28a745;
  }
  
  .todo-button:last-of-type {
    background-color: #dc3545;
  }
  </style>
  