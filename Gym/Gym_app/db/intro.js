const mongoose = require('mongoose');

const uri = 'mongodb+srv://root123:root123@cluster0.fiwefmq.mongodb.net/gym_application';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInformation: {
        email: { type: String, required: true },
        phone: String
    },
    membershipType: String,
    startDate: Date,
    endDate: Date,
    billingPreferences: {
        paymentMethod: String,
        billingAddress: String
    }
});

const attendanceSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    date: { type: Date, required: true }, // Added required attribute
    attendanceType: String,
    attended: Boolean
});

const classSchema = new mongoose.Schema({
    name: String,
    description: String,
    schedule: [{
        day: String,
        startTime: String,
        endTime: String
    }],
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }]
});

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInformation: {
        email: { type: String, required: true },
        phone: String
    },
    specialization: String,
    availability: [{
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }]
});

// Create models
const Member = mongoose.model('Member', memberSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Class = mongoose.model('Class', classSchema);
const Trainer = mongoose.model('Trainer', trainerSchema);

// Export models
module.exports = {
    Member,
    Attendance,
    Class,
    Trainer
};
