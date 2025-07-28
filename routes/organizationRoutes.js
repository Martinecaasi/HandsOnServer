const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

// בדיקה
router.get('/test', organizationController.testOrganization);

// רישום ארגון חדש
router.post('/register', organizationController.registerOrganization);

// התחברות ארגון
router.post('/login', organizationController.loginOrganization);

// קבלת כל הארגונים
router.get('/', organizationController.getAllOrganizations);

// עדכון ארגון לפי ID
router.put('/:id', organizationController.updateOrganization);

// מחיקת ארגון לפי ID
router.delete('/:id', organizationController.deleteOrganization);

module.exports = router;