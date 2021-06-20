// CREATE
exports.Created = {
    success: true,
    message: 'Cultivation List created successfully!',
};
exports.NotCreated = {
    success: false,
    message: 'No cultivation list created!',
};

// FOUND
exports.Found = { success: true, message: 'Cultivation List found successfully!' };
exports.NotFound = { success: false, message: 'No cultivation list found!' };

// UPDATE
exports.Updated = { success: true, message: 'Cultivation List updated successfully!' };
exports.NotUpdated = { success: false, message: 'No cultivation list updated!' };

// CATCH ERROR
exports.Error = (err) => {
    console.log(err.message);
    return { success: false, message: err.message };
};
