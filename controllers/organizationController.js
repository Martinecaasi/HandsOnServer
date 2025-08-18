// Controller for managing organizations in the Hands On system
const Organization = require('../models/Organization');
const bcrypt = require('bcrypt');

// Test API
const testOrganization = (req, res) => {
  res.send("Hello from Organizations API!");
};

// Register a new organization
const registerOrganization = async (req, res) => {
  try {
    const {
      organizationName: name,
      email,
      password,
      phoneNumber,
      streetName,
      streetNumber,
      apartmentNumber,
      apartmentFloor,
      city,
      about
    } = req.body;

    const profileImage = req.file ? req.file.filename : null;

    // Check if organization already exists by email
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: 'An organization with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newOrg = new Organization({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        streetName,
        streetNumber,
        apartmentNumber,
        apartmentFloor,
        city
      },
      about,
      profileImage
    });

    await newOrg.save();
    res.status(201).json({ message: 'Organization registered successfully', organization: newOrg });
  } catch (error) {
    console.error('Error registering organization:', error);
    res.status(500).json({ message: 'Error registering organization', error: error.message });
  }
};

// Login an existing organization
const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if organization exists
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      role: 'organization',
      organization: {
        id: organization._id,
        name: organization.name,
        email: organization.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// Get all organizations
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    console.error('Error retrieving organizations:', err);
    res.status(500).json({ message: 'Error retrieving organizations', error: err.message });
  }
};

// Update organization by ID
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // If password is being updated, hash it
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedOrg = await Organization.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({
      message: 'Organization updated successfully',
      organization: updatedOrg
    });
  } catch (err) {
    console.error('Error updating organization:', err);
    res.status(500).json({ message: 'Error updating organization', error: err.message });
  }
};

// Delete organization by ID
const deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrg = await Organization.findByIdAndDelete(id);

    if (!deletedOrg) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json({ message: 'Organization deleted successfully' });
  } catch (err) {
    console.error('Error deleting organization:', err);
    res.status(500).json({ message: 'Error deleting organization', error: err.message });
  }
};

// Export all controller functions
module.exports = {
  testOrganization,
  registerOrganization,
  loginOrganization,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization
};