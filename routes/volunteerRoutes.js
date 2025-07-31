const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const eventController = require('../controllers/eventsController');
const upload = require('../Middlewares/uploadMiddleware');


router.post('/register', upload.single('profileImage'), volunteerController.registerVolunteer);
// בדיקה
router.get('/test', volunteerController.testVolunteer);

// רישום מתנדב חדש
router.post('/register', volunteerController.registerVolunteer);

// התחברות
router.post('/login', volunteerController.loginVolunteer);

// כל המתנדבים
router.get('/', volunteerController.getAllVolunteers);

// מחיקת כפילויות – חשוב שיהיה לפני /:id
router.delete('/deduplicate', volunteerController.deleteDuplicateVolunteers);

// שליפת אירועים שהמשתמש נרשם אליהם
router.get('/registeredEvents', eventController.getRegisteredEvents);

// עדכון לפי מזהה
router.put('/:id', volunteerController.updateVolunteer);

// מחיקה לפי מזהה
router.delete('/:id', volunteerController.deleteVolunteer);

// שליפת מתנדב לפי מזהה – בסוף!
router.get('/:id', volunteerController.getVolunteerById);



module.exports = router;