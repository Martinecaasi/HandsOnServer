const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://handsonserver-new.onrender.com'
];

const cors = require('cors');

const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://handsonserver-new.onrender.com'
];

app.use(cors());


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
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

module.exports = app;