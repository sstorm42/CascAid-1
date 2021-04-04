const { User } = require('../models/user-model');
const { Event } = require('../models/event-model');
const { Project } = require('../models/project-model');
const { Post } = require('../models/post-model');
const { Volunteering } = require('../models/volunteering-model');
const expressJwt = require('express-jwt');
const config = require('../config/config').get(process.env.NODE_ENV);
const resources = {
    createPost: { action: 'create', module: 'post' },
    readPost: { action: 'read', module: 'post' },
    updatePost: { action: 'update', module: 'post' },
    deletePost: { action: 'delete', module: 'post' },

    createUser: { action: 'create', module: 'user' },
    readUser: { action: 'read', module: 'user' },
    updateUser: { action: 'update', module: 'user' },
    deleteUser: { action: 'delete', module: 'user' },

    updatePassword: { action: 'update', module: 'password' },
};
const individualRole = [
    { ...resources.readPost, isAble: 'true' },
    { ...resources.readProject, isAble: 'true' },
    { ...resources.readUser, isAble: 'true', case: 'own' },
    { ...resources.updateUser, isAble: 'true', case: 'own' },
    { ...resources.updatePassword, isAble: 'true', case: 'own' },
];

const organizationRole = [
    { ...resources.createEvent, isAble: 'true' },
    { ...resources.readEvent, isAble: 'true' },
    { ...resources.updateEvent, isAble: 'true', case: 'own' },
    { ...resources.deleteEvent, isAble: 'true', case: 'own' },
    { ...resources.createProject, isAble: 'true' },
    { ...resources.readProject, isAble: 'true' },
    { ...resources.updateProject, isAble: 'true', case: 'own' },
    { ...resources.deleteProject, isAble: 'true', case: 'own' },

    { ...resources.createPost, isAble: 'true' },
    { ...resources.readPost, isAble: 'true' },
    { ...resources.updatePost, isAble: 'true', case: 'own' },
    { ...resources.deletePost, isAble: 'true', case: 'own' },

    { ...resources.createVolunteering, isAble: 'true' },
    { ...resources.readVolunteering, isAble: 'true' },
    { ...resources.updateVolunteering, isAble: 'true', case: 'own' },
    { ...resources.deleteVolunteering, isAble: 'true', case: 'own' },

    { ...resources.readUser, isAble: 'true', case: 'own' },
    { ...resources.updateUser, isAble: 'true', case: 'own' },
    { ...resources.updatePassword, isAble: 'true', case: 'own' },
];

const adminRole = [
    { ...resources.createEvent, isAble: 'true' },
    { ...resources.readEvent, isAble: 'true' },
    { ...resources.updateEvent, isAble: 'true' },
    { ...resources.deleteEvent, isAble: 'true' },
    { ...resources.createProject, isAble: 'true' },
    { ...resources.readProject, isAble: 'true' },
    { ...resources.updateProject, isAble: 'true' },
    { ...resources.deleteProject, isAble: 'true' },
    { ...resources.createUser, isAble: 'true' },
    { ...resources.readUser, isAble: 'true' },
    { ...resources.updateUser, isAble: 'true' },
    { ...resources.deleteUser, isAble: 'true', case: 'inverse-own' },
    { ...resources.updatePassword, isAble: 'true', case: 'own' },
];

const accessControlTable = {
    individual: individualRole,
    organization: organizationRole,
    admin: adminRole,
};

const accessChecker = (roles, access) => {
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].action === access.action && roles[i].module === access.module) {
            return roles[i];
        }
    }
    access.isAble = false;
    return access;
};

exports.grantAccess = function (action, module) {
    return async (req, res, next) => {
        try {
            const signedInUserType = req.user.userType;
            const roles = accessControlTable[signedInUserType];

            const access = accessChecker(roles, { action, module });

            if (access.isAble && access.case === 'inverse-own') {
                if (module === 'user') {
                    if (req.params.userId.toString() !== req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                }
            } else if (access.isAble && access.case === 'own') {
                if (module === 'user') {
                    if (Object.keys(req.params).length === 0 && req.params.constructor === Object) {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    } else if (req.params.userId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else if (module === 'event') {
                    const event = await Event.findById(req.params.eventId);
                    if (event.creatorId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else if (module === 'post') {
                    const post = await Post.findById(req.params.postId);
                    if (post.creatorId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else if (module === 'project') {
                    const project = await Project.findById(req.params.projectId);
                    if (project.creatorId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else if (module === 'volunteering') {
                    const volunteering = await Volunteering.findById(req.params.volunteeringId);
                    if (volunteering.creatorId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else if (module === 'password') {
                    if (req.params.userId.toString() === req.user._id.toString()) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: 'Not authorised.',
                        });
                    }
                } else
                    res.status(401).json({
                        success: false,
                        message: 'Module not found.',
                    });
            } else if (access.isAble) {
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorised.',
                });
            }
        } catch (error) {
            next(error);
        }
    };
};
exports.allowIfLoggedIn = expressJwt({
    secret: config.SECRET,
    algorithms: ['HS256'],
});
