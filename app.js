const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// CORS - הרשאות לגישה מהדומיינים שלך
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'https://handsonserver-new.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ הכרחי בשביל POST עם JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// סטטי - תמונות
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ראוטים
const volunteerRoutes = require('./routes/volunteerRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventsRoutes');
const citiesRoutes = require('./routes/citiesRoutes');



// שימוש בראוטים
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/cities', citiesRoutes);

module.exports = app;
