const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
const volunteerRoutes = require('./routes/volunteerRoutes');
app.use('/api/volunteers', volunteerRoutes);

module.exports = app;
