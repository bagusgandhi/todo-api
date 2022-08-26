const db = require('../db');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');

const Todo = db.todo;
const { Op } = db.Sequelize;

exports.getAllTodo = catchAsync(async (req, res, next) => {
  const { activity_group_id } = req.query;
  const filter = {};

  if (activity_group_id) {
    filter.activity_group_id = {
      [Op.eq]: activity_group_id,
    };
  }

  const todos = await Todo.findAll({
    where: filter,
  });

  return res.json({
    status: 'Success',
    message: 'Success',
    data: todos,
  });
});

exports.getTodoById = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByPk(req.params.id);

  if (!todo) return next(new AppError(`Todo with ID ${req.params.id} Not Found`, 404));
  return res.json({
    status: 'Success',
    message: 'Success',
    data: todo,
  });
});

exports.createTodo = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create({
    title: req.body.title,
    activity_group_id: req.body.activity_group_id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data: newTodo,
  });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const existTodo = await Todo.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!existTodo) return next(new AppError(`Todo with ID ${req.params.id} Not Found`, 404));

  return res.json({
    status: 'Success',
    message: 'Success',
    data: {},
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const updatedTodo = await Todo.findByPk(req.params.id);
  if (!updatedTodo) return next(new AppError(`Todo with ID ${req.params.id} Not Found`, 404));

  updatedTodo.set(req.body);
  await updatedTodo.save();

  return res.json({
    status: 'Success',
    message: 'Success',
    data: updatedTodo,
  });
});
