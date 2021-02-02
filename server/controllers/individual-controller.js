const { Individual } = require('../models/individual-user-model');

// @route GET api/user/{id}
// @desc Returns a specific user
exports.show = async (req, res) => {
    try {
        res.status(404).json({
            success: false,
            message: 'User does not exist',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        res.status(404).json({
            success: false,
            message: 'User does not exist',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
