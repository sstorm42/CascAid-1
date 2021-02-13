const routes = require('express').Router();
const user = require('./user-route');
const auth = require('./auth-route');
const individual = require('./individual-route');
const organization = require('./organization-route');
const impactArea = require('./impact-area-route');

routes.use('/users', user);
routes.use('/auth', auth);
routes.use('/individual', individual);
routes.use('/organization', organization);
routes.use('/impact-area', impactArea);

const connected = {
    success: true,
    version: '1.0.0',
};
routes.get('/', (req, res) => {
    res.status(200).send(connected);
});

module.exports = routes;
