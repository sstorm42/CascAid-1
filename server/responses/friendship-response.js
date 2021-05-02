// CREATE
exports.Created = {
    success: true,
    message: 'Friendship created successfully!',
};
exports.NotCreated = {
    success: false,
    message: 'No friendship created!',
};

// FIND
exports.Found = {
    success: true,
    message: 'friendships found!',
};
exports.NotFound = {
    success: false,
    message: 'No friendships found!',
};

// DELETE
exports.NotDeleted = {
    success: false,
    message: 'No friendship deleted!',
};
exports.Deleted = {
    success: true,
    message: 'Friendship deleted!',
};

// UPDATE
exports.Updated = {
    success: true,
    message: 'Friendship updated successfully',
};
exports.NotUpdated = {
    success: false,
    message: 'Friendship update failed!',
};

// CATCH ERROR
exports.Error = (err) => {
    console.log(err.message);
    return { success: false, message: err.message };
};
