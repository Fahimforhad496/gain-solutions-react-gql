const express = require("express");
const cors = require("cors");
const compression = require("compression");
// const configureRoutes = require("./controllers");
// const { handleRequest } = require("./middlewares");
const  schema = require("./schema/schema");
var { graphqlHTTP } = require("express-graphql");

const app = express();

app.use(compression());
app.use(cors());

// app.use(express.json());
// app.use(handleRequest);
// configureRoutes(app);
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    })
);
module.exports = app;
