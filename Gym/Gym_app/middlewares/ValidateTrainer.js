// middleware/validateTrainer.js
const validateTrainer = (req, res, next) => {
    const { name, contactInformation, specialization, availability } = req.body;
  
    if (!name || !contactInformation || !contactInformation.email || !specialization || !Array.isArray(availability)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }
  
    next();
  };
  
  module.exports = validateTrainer;
  