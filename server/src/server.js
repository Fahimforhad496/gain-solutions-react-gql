const app = require('./app');
require('dotenv').config();
const connectWithDb = require('./mongo');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectWithDb();
    console.log('server is running on port: ' + PORT);
});