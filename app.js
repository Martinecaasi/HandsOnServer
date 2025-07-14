const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
const volunteerRoutes = require('./routes/volunteerRoutes');
const organizationRoutes = require('./routes/organizationRoutes');

app.use('/api/volunteers', volunteerRoutes);
app.use('/api/organizations', organizationRoutes);

module.exports = app;