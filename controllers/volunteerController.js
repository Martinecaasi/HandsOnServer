// controller לניהול מתנדבים במערכת Hands On
const Volunteer = require('../models/Volunteer');
const bcrypt = require('bcrypt');

// פונקציית בדיקה שה-API עובד
const testVolunteer = (req, res) => {
    res.send('👋 Hello from Volunteers API!');
};

// פונקציה לרישום מתנדב חדש
const registerVolunteer = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            phoneNumber,
            birthdate,
            aboutMe,
            profileImage
        } = req.body;

        const normalizedEmail = email.toLowerCase().trim();

        // בדיקה אם כבר קיים מתנדב עם אותו אימייל
        const existingVolunteer = await Volunteer.findOne({ email: normalizedEmail });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Volunteer with this email already exists' });
        }

        // יצירת מתנדב חדש
        const newVolunteer = new Volunteer({
            fullName,
            email: normalizedEmail,
            password,
            phoneNumber,
            birthdate,
            aboutMe,
            profileImage
        });

        await newVolunteer.save();

        res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// פונקציה לקבלת כל המתנדבים
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error getting volunteers', error: err.message });
    }
};

// פונקציה לעדכון מתנדב לפי ID
const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json({
            message: 'Volunteer updated successfully',
            volunteer: updatedVolunteer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating volunteer', error: err.message });
    }
};

// פונקציה למחיקת מתנדב לפי ID
const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

        if (!deletedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting volunteer', error: err.message });
    }
};

// שליפת מתנדב לפי ID
const getVolunteerById = async (req, res) => {
    try {
        const { id } = req.params;
        const volunteer = await Volunteer.findById(id);

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }

        res.status(200).json(volunteer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching volunteer', error: err.message });
    }
};

// התחברות מתנדב
const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        // חיפוש לפי אימייל
        const volunteer = await Volunteer.findOne({ email: normalizedEmail });
        if (!volunteer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // בדיקת התאמה של סיסמה מוצפנת
        const isMatch = await bcrypt.compare(password, volunteer.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', volunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};

// ייצוא כל הפונקציות
module.exports = {
    testVolunteer,
    registerVolunteer,
    getAllVolunteers,
    updateVolunteer,
    deleteVolunteer,
    getVolunteerById,
    loginVolunteer
};