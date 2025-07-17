const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const eventController = require('../controllers/eventsController');
// בדיקה
router.get('/test', volunteerController.testVolunteer);

// רישום מתנדב חדש
router.post('/register', volunteerController.registerVolunteer);

// קבלת כל המתנדבים
router.get('/', volunteerController.getAllVolunteers);

// עדכון מתנדב לפי ID
router.put('/:id', volunteerController.updateVolunteer);

// מחיקת מתנדב לפי ID
router.delete('/:id', volunteerController.deleteVolunteer);

// get user by id
router.get('/:id', volunteerController.getVolunteerById);
//login user
router.post('/login', volunteerController.loginVolunteer);
//fecth registered events
router.get('/registeredEvents', eventController.getRegisteredEvents);

module.exports = router;
