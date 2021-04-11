import { combineReducers } from 'redux';
import User from './userReducer';
import Auth from './authReducer';
import AreaOfInterest from './area-of-interest-reducer';
import Individual from './individualReducer';
import Organization from './organizationReducer';
import ImpactArea from './impact-area-reducer';
import OrganizationType from './organization-type-reducer';
// import Event from './event-reducer';
// import Project from './project-reducer';
import Post from './post-reducer';
// import Volunteering from './volunteering-reducer';
import { reducer as formReducer } from 'redux-form';
import Follow from './follow-reducer';
import Skill from './skill-reducer';
import Language from './language-reducer';
import Notification from './notification-reducer';
const rootReducer = combineReducers({
    form: formReducer,
    Auth,
    User,
    AreaOfInterest,
    Individual,
    Organization,
    ImpactArea,
    OrganizationType,

    Post,
    Notification,
    Follow,
    Skill,
    Language,
});

export default rootReducer;
