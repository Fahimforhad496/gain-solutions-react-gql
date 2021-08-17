const express = require('express');
const cors = require('cors');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());

module.exports = app;