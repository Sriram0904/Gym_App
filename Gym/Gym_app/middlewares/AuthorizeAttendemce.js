// middleware/authorizeAttendance.js
const authorizeAttendance = (req, res, next) => {
    // Implement authorization logic here
    if (req.userRole === 'admin' || req.userRole === 'trainer') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
  
  module.exports = authorizeAttendance;
  