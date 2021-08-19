const graphql = require("graphql");
const _ = require("lodash");
const Student = require("../models-gql/student");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const StudentType = new GraphQLObjectType({
    name: "Student",
    fields: () => ({    
        id: {type: GraphQLString},    
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        dateOfBirth: { type: GraphQLString },
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
            args: { id: { type: GraphQLID } }, // input
            resolve: (parent, args) => {
                if (!args.id) {
                    return Student.find({});
                }
                return Student.find({ _id: args.id });
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
