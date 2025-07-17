const Event = require('../models/Event');
const testEvent = (req, res) => {
    res.send(' Hello from Events API!');
};
const createEvent = async (req, res) => {
    try {
        const { title, description, date, location, createdBy } = req.body;

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            createdBy
        });

        await newEvent.save();

        res.status(201).json({ message: 'event created successfully', event: newEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error creating event', error: err.message });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
        .populate('createdBy','organizationName')
        .populate('participants','fullName');
        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error getting events', error: err.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId)
        .populate('createdBy','organizationName')
        .populate('participants','fullName');
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error getting event', error: err.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const updatedData = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'event not found' });
        }
        console.log(updatedEvent);
        res.status(200).json({ message: 'event updated successfully', event: updatedEvent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error updating event', error: err.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'event not found' });
        }
        res.status(200).json({ message: 'event deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error deleting event', error: err.message });
    }
}

const joinEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'user already joined this event' });
        }
        event.participants.push(userId);
        await event.save();
        res.status(200).json({ message: 'joined the event successfully', event: event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error occurred while joining the event', error: err.message });
    }
};
const leaveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        if (!event.participants.includes(userId)) {
            return res.status(400).json({ message: 'user is not a participant of this event' });
        }
        event.participants.pull(userId);
        await event.save();
        res.status(200).json({ message: 'left the event successfully', event: event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error occurred while leaving the event', error: err.message });
    }
};
const getParticipants = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId)
        .populate('participants','fullName');
        if (!event) {
            return res.status(404).json({ message: 'event not found' });
        }
        console.log(event.participants);
        res.status(200).json({ participants: event.participants });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'error occurred while getting participants', error: err.message });
    }
};

const getRegisteredEvents = async (req, res) => {
    try {
        const { userId } = req.params;
        const events = await Event.find({ participants: userId })
            .populate('createdBy', 'fullName')
            .populate('participants', 'fullName');

        res.status(200).json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching registered events', error: err.message });
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
    getRegisteredEvents
};