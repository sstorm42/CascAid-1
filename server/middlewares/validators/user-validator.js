const { check, oneOf } = require('express-validator');

// Validation of user
exports.userSignUp = [
    check('email').isLength({ max: 500, min: 6 }).isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({ max: 50, min: 6 }).not().isEmpty().withMessage('You password is required and length should be between 6 to 100 characters.'),
    check('userType').not().isEmpty().isIn(['individual', 'organization']).withMessage('You User Type must be individual or organization.'),
];

exports.userSignIn = [check('email').isEmail().withMessage('Enter a valid email address'), check('password').not().isEmpty()];

exports.setUser = [
    check('name')
        .isLength({ max: 100, min: 2 })
        .not()
        .isEmpty()
        .withMessage('You name is required and length should be between 2 to 100 characters.')
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Name must be alphabetic.'),
    oneOf(
        [
            check('phone')
                .matches(/^[0-9\-().\s]{6,15}$/)
                .withMessage('Invalid phone number.'),
            check('phone').isEmpty(),
        ],
        'Invalid phone number',
    ),
    check('email').isLength({ max: 256, min: 6 }).isEmail().withMessage('Enter a valid email address'),
    check('userType').not().isEmpty().isIn(['individual', 'organization', 'admin']).withMessage('You User Type must be individual or organization.'),
];

exports.updatePassword = [
    check('oldPassword').not().isEmpty().withMessage('You old password is required').isLength({ max: 50, min: 6 }).withMessage('You old password length should be between 6 to 100 characters.'),
    check('password').not().isEmpty().withMessage('You new password is required').isLength({ max: 50, min: 6 }).withMessage('You new password length should be between 6 to 100 characters.'),
];

exports.ValidEmail = [check('email').isEmail().withMessage('Enter a valid email address')];
exports.PasswordReset = [
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Must be at least 6 chars long'),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
];
