const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');
const upload = require('../Middlewares/uploadMiddleware');

// Test route
router.get('/test', organizationController.testOrganization);

// Register organization with image
router.post('/register', upload.single('profileImage'), organizationController.registerOrganization);

// Login organization
router.post('/login', organizationController.loginOrganization);

// Get all organizations
router.get('/', organizationController.getAllOrganizations);

// Update organization with optional image
router.put('/:id', upload.single('profileImage'), organizationController.updateOrganization);

// Delete organization
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;