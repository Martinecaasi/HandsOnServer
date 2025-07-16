const Volunteer = require('../models/Volunteer');

// פונקציית בדיקה
const testVolunteer = (req, res) => {
    res.send('👋 Hello from Volunteers API!');
};


// 📥 Register a new volunteer
const registerVolunteer = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, birthdate, aboutMe, profileImage } = req.body;

        // בדיקה אם כבר קיים משתמש עם המייל הזה
        const existingVolunteer = await Volunteer.findOne({ email });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'Volunteer with this email already exists' });
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

        res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    testVolunteer,
    registerVolunteer
};
