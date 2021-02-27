const routes = require('express').Router();
const user = require('./user-route');
const auth = require('./auth-route');
const individual = require('./individual-route');
const organization = require('./organization-route');
const impactArea = require('./impact-area-route');
const organizationType = require('./organization-type-route');
const event = require('./event-route');
const test = require('./test-route');
const language = require('./language-route');

routes.use('/users', user);
routes.use('/auth', auth);
routes.use('/individual', individual);
routes.use('/organization', organization);
routes.use('/impact-area', impactArea);
routes.use('/organization-type', organizationType);
routes.use('/events', event);
routes.use('/test', test);
routes.use('/languages', language);
const connected = {
    success: true,
    version: '1.0.0',
};
routes.get('/', (req, res) => {
    res.status(200).send(connected);
});

module.exports = routes;
