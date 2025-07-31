const express = require('express');
const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        console.log(`🌐 Database: ${mongoose.connection.name}`);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
