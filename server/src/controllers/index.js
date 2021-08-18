const routes = require('./routes');

const configure = (app) => {
    app.use('/api',routes);
    return app;
}

module.exports = configure;