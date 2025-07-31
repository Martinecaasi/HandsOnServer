// controller לניהול ארגונים במערכת Hands On
const Organization = require('../models/Organization');
const bcrypt = require('bcrypt');

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
            return res.status(400).json({ message: 'An organization with this email already exists' });
        }

        // יצירת ארגון חדש
        const newOrganization = new Organization({
            organizationName: name,
            email,
            password,
            phoneNumber,
            speciality,
            about,
            handsNeeded,
            role:'organization'
        });

        await newOrganization.save(); // שמירה במסד הנתונים
        res.status(201).json({
            message: 'Organization registered successfully',
            organization: newOrganization
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering organization', error: err.message });
    }
};

// פונקציה להתחברות ארגון קיים
const loginOrganization = async (req, res) => {
    try {
        const { email, password } = req.body;

        // חיפוש ארגון לפי אימייל
        const organization = await Organization.findOne({ email });
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // השוואת סיסמה עם bcrypt
        const isMatch = await bcrypt.compare(password, organization.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // התחברות הצליחה
        res.status(200).json({
            message: 'Login successful',
            organization: {
                id: organization._id,
                organizationName: organization.organizationName,
                email: organization.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Login error', error: err.message });
    }
};

// פונקציה לקבלת כל הארגונים
const getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving organizations', error: err.message });
    }
};

// פונקציה לעדכון ארגון לפי ID
const updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedOrg = await Organization.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedOrg) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.status(200).json({
            message: 'Organization updated successfully',
            organization: updatedOrg
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating organization', error: err.message });
    }
};

// פונקציה למחיקת ארגון לפי ID
const deleteOrganization = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOrg = await Organization.findByIdAndDelete(id);

        if (!deletedOrg) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.status(200).json({ message: 'Organization deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting organization', error: err.message });
    }
};

// ייצוא הפונקציות
module.exports = {
    testOrganization,
    registerOrganization,
    loginOrganization,
    getAllOrganizations,
    updateOrganization,
    deleteOrganization
};