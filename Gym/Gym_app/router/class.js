const { Router } = require("express");
const router = Router();
const { Member, Attendance, Class, Trainer } = require('../db/intro.js');

// Create a new class
router.post('/signup', async function(req, res) {
    try {
        // Ensure required fields are present
        const { name, description, schedule, trainerId, members } = req.body;

        if (!name || !schedule || !trainerId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create new class document
        const classDoc = new Class({
            name,
            description,
            schedule,
            trainerId,
            members
        });

        // Save the class to the database
        await classDoc.save();

        res.status(201).json({
            message: 'Class created successfully',
            class: classDoc
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve all classes (with populated trainer and members if necessary)
router.get('/get_class', async function(req, res) {
    try {
        const classes = await Class.find().populate('trainerId').populate('members');
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Retrieve a single class by ID (with populated trainer and members)
router.get('/get_class/:id', async function(req, res) {
    try {
        const classDoc = await Class.findById(req.params.id).populate('trainerId').populate('members');
        if (!classDoc) {
            return res.status(404).json({ message: "Class not found" });
        }
        res.json(classDoc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a class by ID
router.put('/update_class/:id', async function(req, res) {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a class by ID
router.delete('/delete_class/:id', async function(req, res) {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
