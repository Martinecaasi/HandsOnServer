// controller לניהול אדמינים במערכת Hands On
const Admin = require('../models/Admin');

// פונקציית בדיקה שה-API עובד
exports.testAdmin = (req, res) => {
    res.send("👋 Hello from Admin API!");
};

// 📥 רישום אדמין חדש
exports.registerAdmin = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // בדיקה אם כבר קיים אדמין עם אותו מייל
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin עם מייל זה כבר קיים' });
        }

        // יצירת אדמין חדש
        const newAdmin = new Admin({
            fullName,
            email,
            password
        });

        await newAdmin.save();

        res.status(201).json({
            message: 'Admin נרשם בהצלחה',
            admin: newAdmin
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה ביצירת Admin', error: err.message });
    }
};

// 🔑 התחברות אדמין
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // בדיקה אם קיים אדמין עם המייל הזה
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin לא נמצא' });
        }

        // בדיקה אם הסיסמה תואמת
        if (admin.password !== password) {
            return res.status(401).json({ message: 'סיסמה שגויה' });
        }

        res.status(200).json({
            message: 'התחברות הצליחה',
            admin: {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בהתחברות', error: err.message });
    }
};

// 📄 קבלת כל האדמינים
exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בקבלת האדמינים', error: err.message });
    }
};

// ✏️ עדכון אדמין לפי ID
exports.updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin לא נמצא' });
        }

        res.status(200).json({
            message: 'Admin עודכן בהצלחה',
            admin: updatedAdmin
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה בעדכון Admin', error: err.message });
    }
};

// 🗑️ מחיקת אדמין לפי ID
exports.deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin לא נמצא' });
        }

        res.status(200).json({ message: 'Admin נמחק בהצלחה' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'שגיאה במחיקת Admin', error: err.message });
    }
};
