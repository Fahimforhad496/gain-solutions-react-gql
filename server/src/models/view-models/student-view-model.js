class StudentViewModel {
    static convert = (student) => {
        const viewModel = Object.create(student);
        const {__v, ...rest} = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}
module.exports.StudentViewModel = StudentViewModel;