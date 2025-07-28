// routes/eventsRoutes.js

const express = require('express');
const router = express.Router();

// חיבור לקונטרולר של האירועים (עם s בשם הקובץ)
const eventController = require('../controllers/eventsController');

// בדיקה שה-API של אירועים עובד
router.get('/test', eventController.testEvent);

// יצירת אירוע חדש
router.post('/', eventController.createEvent);

// קבלת כל האירועים
router.get('/', eventController.getAllEvents);

// הצטרפות לאירוע
router.post('/:eventId/join', eventController.joinEvent);

// יציאה מאירוע
router.post('/:eventId/leave', eventController.leaveEvent);

// קבלת משתתפים של אירוע
router.get('/:eventId/participants', eventController.getParticipants);

// קבלת אירוע לפי ID
router.get('/:eventId', eventController.getEventById);

// עדכון אירוע
router.put('/:eventId', eventController.updateEvent);

// מחיקת אירוע
router.delete('/:eventId', eventController.deleteEvent);

// קבלת כל האירועים שהמשתמש נרשם אליהם
router.get('/registered/:userId', eventController.getRegisteredEvents);

module.exports = router;