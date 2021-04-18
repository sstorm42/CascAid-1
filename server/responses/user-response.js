exports.UserNotFound = {
    success: false,
    message: 'No user found!',
};
exports.UserFound = {
    success: true,
    message: 'User found!',
};
exports.UserNotUpdated = {
    success: false,
    message: 'User update failed!',
};
exports.UserUpdated = {
    success: true,
    message: 'User update successful',
};
exports.Error = (err) => ({ success: false, message: err.message });
