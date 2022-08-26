const express = require('express');
const cors = require('cors');
const AppError = require('./helpers/appError');
const errorHandler = require('./controllers/error.controller');
const activityRoute = require('./routes/activity');
const todoRoute = require('./routes/todo');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/activity-groups', activityRoute);
app.use('/todo-items', todoRoute);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

module.exports = app;
