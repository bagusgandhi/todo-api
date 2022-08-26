const express = require('express');
const activityController = require('../controllers/activity.controller');

const router = express.Router();

router
  .route('/')
  .get(activityController.getAllActivity)
  .post(activityController.createActivity);

router
  .route('/:id')
  .get(activityController.getActivityById)
  .delete(activityController.deleteActivity)
  .patch(activityController.updateActivity);

module.exports = router;
