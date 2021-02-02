import { combineReducers } from "redux";
import User from "./userReducer";
import Auth from "./authReducer";
import { reducer as formReducer } from "redux-form";
const rootReducer = combineReducers({
	form: formReducer,
	Auth,
	User,
});

export default rootReducer;
