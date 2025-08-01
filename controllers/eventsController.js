const Event = require('../models/Events');

// בדיקת תקינות ה-API
const testEvent = (req, res) => {
    res.send('Hello from Events API!');
};

// יצירת אירוע חדש
const createEvent = async (req, res) => {
    console.log("📦 req.body:", req.body);
    
    try {
        const {
            title,
            description,
            date,
            time,
            city,
            street,
            buildingNumber,
            contactEmail,
            contactPhone,
            createdBy,
            createdByModel
        } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            time,
            city,
            street,
            buildingNumber,
            contactEmail,
            contactPhone,
            createdBy,
            createdByModel
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
};

// שליפת כל האירועים
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'organizationName')
            .populate('participants', 'fullName');
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting events', error: err.message });
    }
};

// שליפת אירוע לפי מזהה
const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId)
            .populate('createdBy', 'organizationName')
            .populate('participants', 'fullName');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting event', error: err.message });
    }
};

// עדכון אירוע קיים
const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updatedData = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
};

// מחיקת אירוע
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
};

// הצטרפות לאירוע
const joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User already joined this event' });
        }

        event.participants.push(userId);
        event.participantsCount = event.participants.length;

        await event.save();

        res.status(200).json({ message: 'Joined the event successfully', event: event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error joining event', error: err.message });
    }
};

// יציאה מאירוע
const leaveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User is not a participant of this event' });
        }

        event.participants.pull(userId);
        event.participantsCount = event.participants.length;

        await event.save();

        res.status(200).json({ message: 'Left the event successfully', event: event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error leaving event', error: err.message });
    }
};

// שליפת משתתפים לפי מזהה אירוע
const getParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId).populate('participants', 'fullName');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ participants: event.participants });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting participants', error: err.message });
    }
};

// שליפת אירועים לפי מזהה משתתף
const getEventsByParticipant = async (req, res) => {
    try {
        const { userId } = req.params;

        const events = await Event.find({ participants: userId })
            .populate('participants', 'fullName email');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving events for the participant',
            error: error.message
        });
    }
};

// פונקציה נוספת עם שם אחר אם נרצה רנדור או נתיב שונה
const getRegisteredEvents = async (req, res) => {
    try {
        const { userId } = req.params;

        const events = await Event.find({ participants: userId })
            .populate('participants', 'fullName email');

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving registered events',
            error: error.message
        });
    }
};

module.exports = {
    testEvent,
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
    getParticipants,
    getEventsByParticipant,
    getRegisteredEvents
};
