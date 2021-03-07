const { validationResult } = require('express-validator');
const library = require('../../utils/library');

// Module to send errors of validation.
module.exports = (req, res, next) => {
    const validResult = validationResult(req);
    console.log('🚀 ~ file: validate.js ~ line 7 ~ validResult', validResult);
    if (validResult.errors.length > 0) {
        const errorMessage = library.createValidationErrorMessage(validResult.errors);

        res.status(400).send({
            success: false,
            errorList: errorMessage,
            err: validResult.errors,
        });
    } else {
        next();
    }
};
