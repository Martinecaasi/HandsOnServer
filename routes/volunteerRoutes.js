const express = require('express');
const router = express.Router();

// בדיקה פשוטה שה-Route עובד
router.get('/test', (req, res) => {
    res.send('👋 Hello from Volunteers API!');
});

module.exports = router;