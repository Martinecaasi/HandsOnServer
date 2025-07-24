// controller לניהול אדמינים במערכת Hands On
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

// פונקציית בדיקה שה-API של אדמינים פעיל
exports.testAdmin = (req, res) => {
    res.send("👋 Hello from Admin API!");
};

// רישום אדמין חדש
exports.registerAdmin = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // בדיקה אם כבר קיים אדמין עם אותו מייל
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'An admin with this email already exists' });
        }

        // יצירת אדמין חדש
        const newAdmin = new Admin({ fullName, email, password });
        await newAdmin.save();

        res.status(201).json({
            message: 'Admin registered successfully',
            admin: newAdmin
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering admin', error: err.message });
    }
};

// התחברות אדמין עם השוואת סיסמה מוצפנת
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // חיפוש אדמין לפי מייל
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // השוואת סיסמה עם bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({
            message: 'Login successful',
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// קבלת כל האדמינים
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching admins', error: err.message });
    }
};

// עדכון אדמין לפי מזהה
exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({
            message: 'Admin updated successfully',
            admin: updatedAdmin
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating admin', error: err.message });
    }
};

// מחיקת אדמין לפי מזהה
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting admin', error: err.message });
    }
};