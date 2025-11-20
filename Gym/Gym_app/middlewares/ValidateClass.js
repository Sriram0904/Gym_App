// middleware/validateClass.js
const validateClass = (req, res, next) => {
  const { name, description, schedule, trainerId, members } = req.body;

  if (!name || !description || !Array.isArray(schedule) || !trainerId || !Array.isArray(members)) {
    return res.status(400).json({ message: 'Missing or invalid fields' });
  }

  next();
};

module.exports = validateClass;
