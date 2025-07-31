const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// Middleware
app.use(express.json());

// Routes
const volunteerRoutes = require('./routes/volunteerRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventsRoutes');

// Using Routes
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/uploads', express.static('public/uploads'));

module.exports = app;