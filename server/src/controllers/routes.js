const express = require("express");
// var { graphqlHTTP } = require("express-graphql");
// var { buildSchema } = require("graphql");
const studentRoutes = require("./student-controller");

let router = express.Router();

router.get("/health", (req, res) => {
    res.send(new Date());
});

router.use("/students", studentRoutes);

// Construct a schema, using GraphQL schema language




module.exports = router;
