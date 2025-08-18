const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Test route
router.get('/test', adminController.testAdmin);

// Register admin
router.post('/register', adminController.registerAdmin);

// Login admin
router.post('/login', adminController.loginAdmin);

// Get all admins
router.get('/', adminController.getAllAdmins);

// Update admin by ID
router.put('/:id', adminController.updateAdmin);

// Delete admin by ID
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;