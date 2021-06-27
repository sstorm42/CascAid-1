import * as Types from '../constants/reducer-types';
import SchedulerDA from '../data_accesses/scheduler-da';

export const checkIfPostAddedToScheduler = (userId, postId) => {
    console.log('🚀 ~ file: scheduler-action.js ~ line 5 ~ checkIfPostAddedToScheduler ~ userId, postId', userId, postId);
    return {
        type: Types.CHECK_IF_POST_ADDED_TO_SCHEDULER,
        payload: SchedulerDA.check_if_post_added_to_scheduler(userId, postId),
    };
};
export const addPostToScheduler = (userId, postId) => {
    return {
        type: Types.ADD_POST_TO_SCHEDULER,
        payload: SchedulerDA.add_post_to_scheduler(userId, postId),
    };
};

export const removePostFromScheduler = (userId, postId) => {
    return {
        type: Types.REMOVE_POST_FROM_SCHEDULER,
        payload: SchedulerDA.remove_post_from_scheduler(userId, postId),
    };
};
