const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// Test route
router.get('/test', organizationController.testOrganization);

// Register
router.post('/register', organizationController.registerOrganization);

module.exports = router;
