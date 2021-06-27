import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Auth from './authReducer';
import User from './userReducer';
import ImpactArea from './impact-area-reducer';
import OrganizationType from './organization-type-reducer';
import Post from './post-reducer';
import Follow from './follow-reducer';
import Skill from './skill-reducer';
import Language from './language-reducer';
import Notification from './notification-reducer';
import Membership from './membership-reducer';
import Friendship from './friendship-reducer';
import Endorsement from './endorsement-reducer';
import Conversation from './conversation-reducer';
import Cultivation from './cultivation-reducer';
import Scheduler from './scheduler-reducer';
const rootReducer = combineReducers({
    form: formReducer,
    Auth,
    User,
    ImpactArea,
    OrganizationType,
    Post,
    Notification,
    Follow,
    Skill,
    Language,
    Membership,
    Friendship,
    Endorsement,
    Conversation,
    Cultivation,
    Scheduler,
});
export default rootReducer;
