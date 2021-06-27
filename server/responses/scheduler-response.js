exports.PostNotFound = {
    success: false,
    message: 'No post found!',
};
exports.PostFound = {
    success: true,
    message: 'Post found!',
};
exports.ScheduleNotFound = {
    success: false,
    message: 'No schedule found!',
};
exports.ScheduleFound = {
    success: true,
    message: 'Schedule found!',
};
exports.SchedulerNotUpdated = {
    success: false,
    message: 'Scheduler update failed!',
};
exports.SchedulerUpdated = {
    success: true,
    message: 'Scheduler update successful',
};
// CATCH ERROR
exports.Error = (err) => ({ success: false, message: err.message });
