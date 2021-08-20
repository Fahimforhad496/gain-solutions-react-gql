const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    studentId: String,
    studentName: String,
    subjectId: String,
    subjectName: String,
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
