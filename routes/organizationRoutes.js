const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.get('/test', organizationController.testOrganization);

module.exports = router;
