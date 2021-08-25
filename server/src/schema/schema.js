const graphql = require("graphql");
const _ = require("lodash");
const Student = require("../models-gql/student");
const Subject = require("../models-gql/subject");
const Enrollment = require("../models-gql/enrollment");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
    }),
});

const SubjectType = new GraphQLObjectType({
    name: "Subject",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    }),
});

const StudentsWithSubjects = new GraphQLObjectType({
    name: "StudentsWithSubjects",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
        subjects: { type: new GraphQLList(EnrollmentType) },
    }),
});
const SubjectsWithStudents = new GraphQLObjectType({
    name: "SubjectsWithStudents",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        students: { type: new GraphQLList(EnrollmentType) },
    }),
});

const EnrollmentType = new GraphQLObjectType({
    name: "Enrollment",
    fields: () => ({
        id: { type: GraphQLString },
        studentId: { type: GraphQLString },
        studentName: { type: GraphQLString },
        subjectName: { type: GraphQLString },
        subjectId: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        status: {
            type: GraphQLString,
            resolve(parent, args) {
                return "GraphQL sucks!";
            },
        },
        students: {
            type: new GraphQLList(StudentType), // output
            resolve: async (parent, args) => {
                let models = await Student.find({});
                let viewModels = models.map((student) => {
                    const viewModel = Object.create(student);
                    const { __v, ...rest } = JSON.parse(
                        JSON.stringify(viewModel)
                    );
                    console.log(rest);
                    return rest;
                });
                return viewModels;
            },
        },
        subjects: {
            type: new GraphQLList(SubjectType), // output
            resolve: (parent, args) => {
                return Subject.find({});
            },
        },
        enrollments: {
            type: new GraphQLList(EnrollmentType), // output
            resolve: (parent, args) => {
                return Enrollment.find({});
            },
        },
        subjectsWithStudents: {
            type: new GraphQLList(SubjectsWithStudents), // output

            resolve: async (parent, args) => {
                let model = await Subject.find({});
                let viewModels = model.map((subject) => {
                    const viewModel = Object.create(subject);
                    const { __v, ...rest } = JSON.parse(
                        JSON.stringify(viewModel)
                    );
                    return rest;
                });
                console.log("subjectsViewModels", viewModels);
                let result = viewModels.map(async (subject) => {
                    let students = await Enrollment.find({
                        subjectId: subject._id,
                    });
                    let viewStudents = students.map((student) => {
                        const viewModel = Object.create(student);
                        const { __v, ...rest } = JSON.parse(
                            JSON.stringify(viewModel)
                        );
                        return rest;
                    });
                    console.log("studentsViewModels", viewStudents);
                    subject.students = viewStudents;
                    return subject;
                });
                return result;
            },
        },
        studentsWithSubjects: {
            type: new GraphQLList(StudentsWithSubjects), // output

            resolve: async (parent, args) => {
                let models = await Student.find({});
                let viewModels = models.map((student) => {
                    const viewModel = Object.create(student);
                    const { __v, ...rest } = JSON.parse(
                        JSON.stringify(viewModel)
                    );
                    console.log(rest);
                    return rest;
                });
                console.log("viewModels", viewModels);
                let result = viewModels.map(async (student) => {
                    let subjects = await Enrollment.find({
                        studentId: student._id,
                    });
                    let viewSubjects = subjects.map((subject) => {
                        const viewSubject = Object.create(subject);
                        const { __v, ...rest } = JSON.parse(
                            JSON.stringify(viewSubject)
                        );
                        console.log(rest);
                        return rest;
                    });
                    student.subjects = viewSubjects;
                    return student;
                });
                // console.log("result", result);
                //  console.log("models", models);

                return result;
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                dateOfBirth: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                console.log(args);
                let student = new Student({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    dateOfBirth: args.dateOfBirth,
                });
                return student.save();
            },
        },
        addSubject: {
            type: SubjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let subject = new Subject({
                    name: args.name,
                });
                return subject.save();
            },
        },
        addEnrollment: {
            type: EnrollmentType,
            args: {
                studentId: { type: new GraphQLNonNull(GraphQLString) },
                studentName: { type: new GraphQLNonNull(GraphQLString) },
                subjectId: { type: new GraphQLNonNull(GraphQLString) },
                subjectName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                let enrollment = new Enrollment({
                    studentId: args.studentId,
                    studentName: args.studentName,
                    subjectId: args.subjectId,
                    subjectName: args.subjectName,
                });
                return enrollment.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});

// let schema = buildSchema(`

// input StudentRequest {
//   name: String!
//   email: String!
//   phone: String!
//   dateOfBirth: String!
// }

//   type Query {
//     hello: String
//     addStudent(student: StudentRequest): String
//   }
// `);

// // The root provides a resolver function for each API endpoint
// let root = {
//     hello: () => {
//         return "Hello world at " + new Date();
//     },
//     addStudent: (s) => {
//         console.log(s);
//         return "Hello world at " + new Date();
//     },
// };

// module.exports = { schema , root };

/**
 *  db.enrollments.find({subjectId: params.subjectId});
 *
 *
 */
