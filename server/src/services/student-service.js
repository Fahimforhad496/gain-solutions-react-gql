const models = require("../models/data-models");
const {
    StudentViewModel,
} = require("../models/view-models/student-view-model");
const Model = models.Student;

const getAll = async () => {
    let students = await Model.find();
    let viewModel = students.map((student) =>
        StudentViewModel.convert(student)
    );
    return viewModel;
};

const save = async (student) => {
    const model = await Model.createNew(student);
    const savedItem = await model.save();
    return savedItem._id;
};

const update = async () => {
    const id = student.id;
    let model = await Model.findById(id);
    if (model) {
        model.name = student.name;
        model.email = student.email;
        model.phone = student.phone;
        model.dateOfBirth = student.dateOfBirth;
    }
};

const deleteById = async (id) => {
    const model = await Model.findById(id);
    if (model) {
        let result = await model.deleteOne({ _id: id });
        return result;
    }
};

const getById = async (id) => {
    let model = await Model.findById(id);
    let viewModel = StudentViewModel.convert(model);
    return viewModel;
};

module.exports = { getAll, save, update, deleteById, getById };