const { User } = require('../models/user-model');

const resources = {
    createEvent: { action: 'create', module: 'event' },
    readEvent: { action: 'read', module: 'event' },
    updateEvent: { action: 'update', module: 'event' },
    deleteEvent: { action: 'delete', module: 'event' },

    createUser: { action: 'create', module: 'user' },
    readUser: { action: 'read', module: 'user' },
    updateUser: { action: 'update', module: 'user' },
    deleteUser: { action: 'delete', module: 'user' },

    updatePassword: { action: 'update', module: 'password' },
};
const individualRole = [
    { ...resources.readEvent, isAble: 'true' },
    { ...resources.readUser, isAble: 'true', case: 'own' },
    { ...resources.updateUser, isAble: 'true', case: 'own' },
    { ...resources.updatePassword, isAble: 'true', case: 'own' },
];

const organizationRole = [
    { ...resources.createEvent, isAble: 'true' },
    { ...resources.readEvent, isAble: 'true' },
    { ...resources.updateEvent, isAble: 'true', case: 'own' },
    { ...resources.deleteEvent, isAble: 'true', case: 'own' },
    { ...resources.readUser, isAble: 'true', case: 'own' },
    { ...resources.updateUser, isAble: 'true', case: 'own' },
    { ...resources.updatePassword, isAble: 'true', case: 'own' },
];

const adminRole = [
    { ...resources.createEvent, isAble: 'true' },
    { ...resources.readEvent, isAble: 'true' },
    { ...resources.updateEvent, isAble: 'true' },
    { ...resources.deleteEvent, isAble: 'true' },
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
                    if (event.organizationId.toString() === req.user._id.toString()) {
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

exports.allowIfLoggedin = async (req, res, next) => {
    let token = req.cookies.userAuthToken;
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.status(401).json({
                isAuth: false,
                success: false,
                message: 'Not authenticated',
            });

        req.token = token;
        req.user = user;
        next();
    });
};
