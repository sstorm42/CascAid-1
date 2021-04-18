// CREATE
exports.Created = {
    success: true,
    message: 'Membership created successfully!',
};
exports.NotCreated = {
    success: false,
    message: 'No membership created!',
};

// FIND
exports.Found = {
    success: true,
    message: 'Membership found!',
};
exports.NotFound = {
    success: false,
    message: 'No membership found!',
};

// DELETE
exports.NotDeleted = {
    success: false,
    message: 'No membership deleted!',
};
exports.Deleted = {
    success: true,
    message: 'Membership deleted!',
};

// UPDATE
exports.Updated = {
    success: true,
    message: 'Membership updated successfully',
};
exports.NotUpdated = {
    success: false,
    message: 'Membership update failed!',
};

// CATCH ERROR
exports.Error = (err) => ({ success: false, message: err.message });
