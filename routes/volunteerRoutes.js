const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');

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

module.exports = router;
