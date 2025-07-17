// controller לניהול מתנדבים במערכת Hands On
const Volunteer = require('../models/Volunteer');

// פונקציית בדיקה שה-API עובד
const testVolunteer = (req, res) => {
    res.send('👋 Hello from Volunteers API!');
};

// פונקציה לרישום מתנדב חדש
const registerVolunteer = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, birthdate, aboutMe, profileImage } = req.body;

        // בדיקה אם כבר קיים מתנדב עם המייל הזה
        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'מתנדב עם מייל זה כבר קיים' });
        }

        // יצירת מתנדב חדש
        const newVolunteer = new Volunteer({
            fullName,
            email,
            password,
            phoneNumber,
            birthdate,
            aboutMe,
            profileImage
        });

        await newVolunteer.save();

        res.status(201).json({ message: 'המתנדב נרשם בהצלחה', volunteer: newVolunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאת שרת', error: err.message });
    }
};

// פונקציה לקבלת כל המתנדבים
const getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.status(200).json(volunteers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בקבלת המתנדבים', error: err.message });
    }
};

// פונקציה לעדכון מתנדב לפי ID
const updateVolunteer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedVolunteer = await Volunteer.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedVolunteer) {
            return res.status(404).json({ message: 'מתנדב לא נמצא' });
        }

        res.status(200).json({
            message: 'המתנדב עודכן בהצלחה',
            volunteer: updatedVolunteer
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בעדכון המתנדב', error: err.message });
    }
};

// פונקציה למחיקת מתנדב לפי ID
const deleteVolunteer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);

        if (!deletedVolunteer) {
            return res.status(404).json({ message: 'מתנדב לא נמצא' });
        }

        res.status(200).json({ message: 'המתנדב נמחק בהצלחה' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה במחיקת המתנדב', error: err.message });
    }
};

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
const loginVolunteer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const volunteer = await Volunteer.findOne({ email });
        if (!volunteer || volunteer.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', volunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};

// ייצוא הפונקציות
module.exports = {
    testVolunteer,
    registerVolunteer,
    getAllVolunteers,
    updateVolunteer,
    deleteVolunteer,
    getVolunteerById,
    loginVolunteer
};
