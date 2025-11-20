const { Router } = require("express");
const router = Router();
const { Member, Attendance, Class, Trainer } = require('../db/intro.js');

// Record attendance
router.post('/signup', async function(req, res) {
    try {
        const { memberId, date, attendanceType, attended } = req.body;

        // Validate required fields
        if (!memberId || !date || !attendanceType || attended === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const attendance = new Attendance({
            memberId,
            date,
            attendanceType,
            attended
        });

        await attendance.save();
        res.status(201).json({
            message: 'Attendance recorded successfully',
            attendance
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record attendance' });
    }
});

// Retrieve all attendances for a member
router.get('/get_attendance/member/:id', async function(req, res) {
    try {
        const attendances = await Attendance.find({ memberId: req.params.id });
        if (attendances.length === 0) {
            return res.status(404).json({ message: 'No attendance records found' });
        }
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendances' });
    }
});

// Retrieve all attendances for a member on a specific date
router.get('/get_attendance/member/:id/:date', async function(req, res) {
    try {
        const attendances = await Attendance.find({ memberId: req.params.id, date: new Date(req.params.date) });
        if (attendances.length === 0) {
            return res.status(404).json({ message: 'No attendance records found for this date' });
        }
        res.json(attendances);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendances' });
    }
});

// Retrieve a single attendance by ID
router.get('/get_attendance/:id', async function(req, res) {
    try {
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve attendance' });
    }
});

// Update a member's attendance type
router.put('/update_attendance/:id/attendanceType', async function(req, res) {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { $set: { attendanceType: req.body.attendanceType } },
            { new: true }
        );
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update attendance type' });
    }
});

// Update a member's attendance status
router.put('/update_attendance/:id/attended', async function(req, res) {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { $set: { attended: req.body.attended } },
            { new: true }
        );
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update attendance status' });
    }
});

// Delete an attendance
router.delete('/delete_attendance/:id', async function(req, res) {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete attendance' });
    }
});

module.exports = router;
