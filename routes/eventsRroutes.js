const express =require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/test', eventController.testEvent);
router.post('/' , eventController.createEvent);
router.get('/' , eventController.getAllEvents);
router.post('/:eventId/join',eventController.joinEvent);
router.post('/:eventId/leave',eventController.leaveEvent);
router.get('/:eventId/participants',eventController.getParticipants);
router.get('/:eventId' , eventController.getEventById);
router.put('/:eventId' , eventController.updateEvent);
router.delete('/:eventId' , eventController.deleteEvent);
router.get('/registered/:userId', eventController.getRegisteredEvents);
module.exports = router;