const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// כתובת בדיקה
router.get('/test', organizationController.test);

module.exports = router;