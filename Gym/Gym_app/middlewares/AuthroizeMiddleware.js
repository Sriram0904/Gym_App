// middleware/authorizeMember.js
const authorizeMember = (req, res, next) => {
    // Implement your authorization logic here
    // For example, checking if the user has access to the requested member data
    if (req.userRole === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
  
  module.exports = authorizeMember;
  