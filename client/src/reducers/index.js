import { combineReducers } from 'redux';
import User from './userReducer';
import Auth from './authReducer';
import AreaOfInterest from './area-of-interest-reducer';
import Individual from './individualReducer';
import Organization from './organizationReducer';
import ImpactArea from './impact-area-reducer';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
    form: formReducer,
    Auth,
    User,
    AreaOfInterest,
    Individual,
    Organization,
    ImpactArea,
});

export default rootReducer;
