const express = require('express');
const router = express.Router();
const { Trainer } = require('../db/intro.js'); // Ensure Trainer is correctly exported

// Signup route
router.post('/signup', async function(req, res) {
  try {
    // Extracting the fields from the request body
    const { name, email, phone, specialization, availability } = req.body;

    // Check if required fields are present
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Creating the trainer document with the provided data
    const trainer = new Trainer({
      name,
      contactInformation: {
        email,
        phone
      },
      specialization,
      availability
    });

    // Saving the trainer document to the database
    await trainer.save();

    // Sending the response with status 201 and the created trainer document
    res.status(201).json({ message: "Trainer created successfully", trainer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve all trainers
router.get('/get_trainer', async function(req, res) {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a specific trainer by ID
router.get('/get_trainer/:id', async function(req, res) {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a trainer by ID
router.put('/update_trainer/:id', async function(req, res) {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json(updatedTrainer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a trainer by ID
router.delete('/delete_trainer/:id', async function(req, res) {
  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!deletedTrainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    res.json({ message: 'Trainer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
