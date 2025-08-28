// controller לניהול ארגונים במערכת Hands On
const Organization = require('../models/Organization');
const bcrypt = require('bcrypt');

// בדיקה שה-API זמין
const testOrganization = (req, res) => {
  res.send("Hello from Organizations API!");
};

// רישום ארגון חדש
const registerOrganization = async (req, res) => {
  try {
    const {
      organizationName,
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

    console.log('Registering organization:', organizationName, email, phoneNumber, streetName, streetNumber, apartmentNumber, apartmentFloor, city, about);
    // שמירת שם קובץ תמונת פרופיל אם הועלתה
    const profileImage = req.file ? req.file.filename : null;

    // בדיקה אם כבר קיים ארגון עם אותו אימייל
    const existingOrg = await Organization.findOne({ email });
    if (existingOrg) {
      return res.status(400).json({ message: 'An organization with this email already exists' });
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת מופע חדש של ארגון
    const newOrg = new Organization({
      organizationName,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        street_Name: streetName,
        street_Num: streetNumber,
        appartment_Num: apartmentNumber,
        appartment_Floor: apartmentFloor,
        city
      },
      about,
      profileImage
    });

    await newOrg.save();

    res.status(201).json({
      message: 'Organization registered successfully',
      organization: newOrg
    });
  } catch (error) {
    console.error('Error registering organization:', error);
    res.status(500).json({ message: 'Error registering organization', error: error.message });
  }
};

// התחברות של ארגון קיים
const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for organization:', email, password ? 'password provided' : 'no password provided');
    
    // חיפוש הארגון לפי אימייל
    const organization = await Organization.findOne({ email });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    // השוואת סיסמה עם bcrypt
    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // התחברות הצליחה
    res.status(200).json({
      message: 'Login successful',
      role: 'organization',
      organization: {
        id: organization._id,
        name: organization.organizationName,
        email: organization.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

// שליפת כל הארגונים
const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (err) {
    console.error('Error retrieving organizations:', err);
    res.status(500).json({ message: 'Error retrieving organizations', error: err.message });
  }
};

// עדכון פרטי ארגון לפי מזהה
const updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // אם מעדכנים סיסמה – נצפין אותה
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

// מחיקת ארגון לפי מזהה
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

// ייצוא הפונקציות
module.exports = {
  testOrganization,
  registerOrganization,
  loginOrganization,
  getAllOrganizations,
  updateOrganization,
  deleteOrganization
};