// middleware/validateAttendance.js
const validateAttendance = (req, res, next) => {
    const { memberId, date, attendanceType, attended } = req.body;
  
    if (!memberId || !date || typeof attended !== 'boolean') {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }
  
    next();
  };
  
  module.exports = validateAttendance;
  