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
const follow = require('./follow-route');
const project = require('./project-route');
const post = require('./post-route');
const volunteering = require('./volunteering-route');
const skill = require('./skill-route');
const home = require('./home-route');
const notification = require('./notification-route');

routes.use('/users', user);
routes.use('/auth', auth);
routes.use('/individuals', individual);
routes.use('/organizations', organization);
routes.use('/impact-areas', impactArea);
routes.use('/organization-types', organizationType);
// routes.use('/events', event);
routes.use('/test', test);
routes.use('/languages', language);
routes.use('/follows', follow);
// routes.use('/projects', project);
routes.use('/posts', post);
// routes.use('/volunteerings', volunteering);
routes.use('/skills', skill);
routes.use('/home', home);
routes.use('/notifications', notification);
const connected = {
    success: true,
    version: '1.0.0',
};
routes.get('/', (req, res) => {
    res.status(200).send(connected);
});

module.exports = routes;
