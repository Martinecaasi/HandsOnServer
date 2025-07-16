const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

// 🔥 Test route
router.get('/test', volunteerController.testVolunteer);

// 📥 Register a new volunteer
router.post('/register', volunteerController.registerVolunteer);

module.exports = router;
