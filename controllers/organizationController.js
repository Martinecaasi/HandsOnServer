// controller לניהול ארגונים במערכת Hands On
const Organization = require('../models/Organization');

// פונקציה לבדיקה שה-API עובד
const testOrganization = (req, res) => {
    res.send("Hello from Organizations API!");
};

// פונקציה לרישום ארגון חדש
const registerOrganization = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, speciality, about, handsNeeded } = req.body;

        // בדיקה אם כבר קיים ארגון עם אותו מייל
        const existingOrganization = await Organization.findOne({ email });
        if (existingOrganization) {
            return res.status(400).json({ message: 'ארגון עם מייל זה כבר קיים' });
        }

        // יצירת ארגון חדש
        const newOrganization = new Organization({
            name,
            email,
            password,
            phoneNumber,
            speciality,
            about,
            handsNeeded
        });

        await newOrganization.save(); // שמירה במסד הנתונים
        res.status(201).json({
            message: 'ארגון נרשם בהצלחה',
            organization: newOrganization
        });
    } catch (err) {
        res.status(500).json({ message: 'שגיאה ביצירת הארגון', error: err.message });
    }
};

// פונקציה לקבלת כל הארגונים
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בקבלת הארגונים', error: err.message });
    }
};

// פונקציה לעדכון ארגון לפי ID
const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedOrg = await Organization.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedOrg) {
            return res.status(404).json({ message: 'ארגון לא נמצא' });
        }

        res.status(200).json({
            message: 'הארגון עודכן בהצלחה',
            organization: updatedOrg
        });
    } catch (err) {
        res.status(500).json({ message: 'שגיאה בעדכון הארגון', error: err.message });
    }
};

// פונקציה למחיקת ארגון לפי ID
const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrg = await Organization.findByIdAndDelete(id);

        if (!deletedOrg) {
            return res.status(404).json({ message: 'ארגון לא נמצא' });
        }

        res.status(200).json({
            message: 'הארגון נמחק בהצלחה'
        });
    } catch (err) {
        res.status(500).json({ message: 'שגיאה במחיקת הארגון', error: err.message });
    }
};

// ייצוא הפונקציות
module.exports = { 
    testOrganization,
    registerOrganization,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization
};