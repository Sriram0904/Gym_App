const { Router } = require("express");
const router = Router();
const { Member } = require('../db/intro.js');

// Signup route
router.post('/signup', async function(req, res) {
  try {
    const member = new Member({
      name: req.body.name,
      contactInformation: {
        email: req.body.email,
        phone: req.body.phone
      },
      membershipType: req.body.membershipType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      billingPreferences: {
        paymentMethod: req.body.paymentMethod,
        billingAddress: req.body.billingAddress
      }
    });

    await member.save();
    res.json({
      message: 'Member created successfully',
      member: member
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all members
router.get('/get_members', async function(req, res) {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve a single member by ID
router.get('/get_members/:id', async function(req, res) {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a member's email address
router.put('/update_members/:id/email', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { 'contactInformation.email': req.body.email } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member's phone number
router.put('/update_members/:id/phone', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { 'contactInformation.phone': req.body.phone } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member's membership type
router.put('/update_members/:id/membershipType', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { membershipType: req.body.membershipType } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member's start date
router.put('/update_members/:id/startDate', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { startDate: req.body.startDate } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member's end date
router.put('/update_members/:id/endDate', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { endDate: req.body.endDate } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a member's billing preferences
router.put('/update_members/:id/billingPreferences', async function(req, res) {
  try {
    const member = await Member.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { billingPreferences: req.body.billingPreferences } },
      { new: true }
    );
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a member
router.delete('/delete_members/:id', async function(req, res) {
  try {
    const member = await Member.findOneAndDelete({ _id: req.params.id });
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({
      message: 'Member deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
