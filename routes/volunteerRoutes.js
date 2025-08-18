const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const eventController = require('../controllers/eventsController');
const upload = require('../Middlewares/uploadMiddleware');

// Test route
router.get('/test', volunteerController.testVolunteer);

// Register volunteer with image
router.post('/register', upload.single('profileImage'), volunteerController.registerVolunteer);

// Login
router.post('/login', volunteerController.loginVolunteer);

// Get all volunteers
router.get('/', volunteerController.getAllVolunteers);

// Remove duplicate volunteers by email
router.delete('/deduplicate', volunteerController.deleteDuplicateVolunteers);

// Get events registered by volunteer
router.get('/registeredEvents', eventController.getRegisteredEvents);

// Update volunteer
router.put('/:id', upload.single('profileImage'), volunteerController.updateVolunteer);

// Delete volunteer
router.delete('/:id', volunteerController.deleteVolunteer);

// Get volunteer by ID
router.get('/:id', volunteerController.getVolunteerById);

module.exports = router;