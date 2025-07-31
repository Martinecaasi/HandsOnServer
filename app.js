const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const allowedOrigins = ['https://handsonn.netlify.app', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // מותר
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
