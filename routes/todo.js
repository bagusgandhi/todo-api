const express = require('express');
const todoController = require('../controllers/todo.controller');

const router = express.Router();

router
  .route('/')
  .get(todoController.getAllTodo)
  .post(todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodoById)
  .delete(todoController.deleteTodo)
  .patch(todoController.updateTodo);

module.exports = router;
