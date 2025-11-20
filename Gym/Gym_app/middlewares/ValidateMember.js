
const validateMember = (req, res, next) => {
    const { name, contactInformation, membershipType } = req.body;
  
    if (!name || !contactInformation || !contactInformation.email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    next();
  };
  
  module.exports = validateMember;
  