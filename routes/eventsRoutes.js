const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventsController');

// Test route to verify events API is working
router.get('/test', eventController.testEvent);

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get all events the user is registered to
router.get('/registered/:userId', eventController.getRegisteredEvents);

// Get all events created by a specific user (must be before :eventId)
router.get('/my-events/:userId', eventController.getEventsByParticipant);

// Join an event by event ID
router.post('/:eventId/join', eventController.joinEvent);

// Leave an event by event ID
router.post('/:eventId/leave', eventController.leaveEvent);

// Get participants of a specific event
router.get('/:eventId/participants', eventController.getParticipants);

// Update an event by ID
router.put('/:eventId', eventController.updateEvent);

// Delete an event by ID
router.delete('/:eventId', eventController.deleteEvent);

// Get a single event by ID (keep this last)
router.get('/:eventId', eventController.getEventById);

module.exports = router;