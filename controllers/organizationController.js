const Organization = require('../models/Organization');

const testOrganization = (req, res) => {
    res.send("Hello from Organizations API!");
};

// Register a new organization
const registerOrganization = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, speciality, about, handsNeeded } = req.body;

        const existingOrganization = await Organization.findOne({ email });
        if (existingOrganization) {
            return res.status(400).json({ message: 'Organization with this email already exists' });
        }

        const newOrganization = new Organization({
            name,
            email,
            password,
            phoneNumber,
            speciality,
            about,
            handsNeeded
        });

        await newOrganization.save();
        res.status(201).json({
            message: 'Organization registered successfully',
            organization: newOrganization
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    testOrganization,
    registerOrganization 
};
