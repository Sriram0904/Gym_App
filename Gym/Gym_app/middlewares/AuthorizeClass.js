// middleware/authorizeClass.js
const authorizeClass = (req, res, next) => {
    // Implement your authorization logic here
    if (req.userRole === 'admin' || req.userRole === 'trainer') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
  
  module.exports = authorizeClass;
  