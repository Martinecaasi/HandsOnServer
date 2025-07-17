const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// בדיקה
router.get('/test', adminController.testAdmin);

// רישום אדמין חדש
router.post('/register', adminController.registerAdmin);

// התחברות אדמין
router.post('/login', adminController.loginAdmin);

// קבלת כל האדמינים
router.get('/', adminController.getAllAdmins);

// עדכון אדמין לפי ID
router.put('/:id', adminController.updateAdmin);

// מחיקת אדמין לפי ID
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
