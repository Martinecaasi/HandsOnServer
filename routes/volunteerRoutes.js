const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

router.get('/test', volunteerController.testVolunteer);

module.exports = router;
