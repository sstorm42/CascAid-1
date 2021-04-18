const routes = require('express').Router();
const user = require('./user-route');
const auth = require('./auth-route');
const impactArea = require('./impact-area-route');
const organizationType = require('./organization-type-route');
const test = require('./test-route');
const language = require('./language-route');
const follow = require('./follow-route');
const post = require('./post-route');
const skill = require('./skill-route');
const notification = require('./notification-route');
const membership = require('./membership-route');

routes.use('/users', user);
routes.use('/auth', auth);
routes.use('/impact-areas', impactArea);
routes.use('/organization-types', organizationType);
routes.use('/test', test);
routes.use('/languages', language);
routes.use('/follows', follow);
routes.use('/posts', post);
routes.use('/skills', skill);
routes.use('/notifications', notification);
routes.use('/memberships', membership);

const connected = {
    success: true,
    version: '1.0.0',
};
routes.get('/', (req, res) => {
    res.status(200).send(connected);
});

module.exports = routes;
