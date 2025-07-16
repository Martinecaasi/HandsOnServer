const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/test', adminController.testAdmin);

module.exports = router;