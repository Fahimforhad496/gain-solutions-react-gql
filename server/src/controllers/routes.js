const express = require('express');
const studentRoutes = require('./student-controller');

let router = express.Router();

router.use('/students', studentRoutes);

module.exports = router;