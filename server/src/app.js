const express = require("express");
const cors = require("cors");
const compression = require("compression");
const configureRoutes = require("./controllers");
const { handleRequest } = require("./middlewares");
const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(handleRequest);
configureRoutes(app);
module.exports = app;
