const express = require('express');
const app = express();

// Use built-in JSON middleware
app.use(express.json());

// Import routers for each entity
const attendanceRouter = require("./router/attendance");
const classRouter = require("./router/class");
const memberRouter = require("./router/member");
const trainerRouter = require("./router/trainer");

// Use routers
app.use("/attendance", attendanceRouter);
app.use("/classes", classRouter);
app.use("/member", memberRouter);  // Added memberRouter here
app.use("/trainers", trainerRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
