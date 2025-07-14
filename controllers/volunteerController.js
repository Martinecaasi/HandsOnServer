// volunteerController.js

// פונקציה לבדיקה שה-Controller עובד
const testVolunteer = (req, res) => {
    res.send("👋 Hello from Volunteers API!");
};

// בעתיד נוסיף כאן פונקציות CRUD:
// - createVolunteer
// - getVolunteers
// - updateVolunteer
// - deleteVolunteer

module.exports = {
    testVolunteer,
};
