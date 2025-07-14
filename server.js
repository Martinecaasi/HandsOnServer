const mongoose = require('mongoose');
require('dotenv').config();

// מתחברים ל-MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        console.log(`🌐 Database: ${mongoose.connection.name}`);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });