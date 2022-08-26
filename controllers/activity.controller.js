const db = require('../db');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');

const Activity = db.activity;

exports.getAllActivity = catchAsync(async (req, res, next) => {
  const allActivity = await Activity.findAll();
  return res.json({
    status: 'Success',
    message: 'Success',
    data: allActivity,
  });
});

exports.getActivityById = catchAsync(async (req, res, next) => {
  const activityId = await Activity.findByPk(req.params.id);
  if (!activityId) return next(new AppError(`Activity with ID ${req.params.id} Not Found`, 404));
  return res.json({
    status: 'Success',
    message: 'Success',
    data: activityId,
  });
});

exports.createActivity = catchAsync(async (req, res, next) => {
  const newActivity = await Activity.create({
    title: req.body.title,
    email: req.body.email,
  });
  if (!newActivity) return next(new AppError('title cannot be null', 400));
  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data: newActivity,
  });
});

exports.deleteActivity = catchAsync(async (req, res, next) => {
  const existActivity = await Activity.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!existActivity) return next(new AppError(`No record found for id ${req.params.id}`, 404));
  return res.json({
    status: 'Success',
    message: 'Success',
    data: {},
  });
});

exports.updateActivity = catchAsync(async (req, res, next) => {
  const updatedActivity = await Activity.findByPk(req.params.id);
  if (!updatedActivity) return next(new AppError(`Activity with ID ${req.params.id} Not Found`, 404));

  updatedActivity.title = req.body.title;
  await updatedActivity.save();

  return res.json({
    status: 'Success',
    message: 'Success',
    data: updatedActivity,
  });
});
