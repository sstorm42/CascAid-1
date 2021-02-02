import * as Types from "../constants/reducer-types";
const initialState = {
	user: {},
	allUsers: [],
};
export default function (state = initialState, action) {
	switch (action.type) {
		case Types.GET_ALL_USERS:
			return { ...state, allUsers: action.payload };
		case Types.GET_USER:
			return { ...state, user: action.payload };
		case Types.SET_USER:
			return { ...state, user: action.payload };
		case Types.DELETE_USER:
			return { ...state, user: action.payload };
		case Types.CLEAR_USER:
			return { ...state, user: {} };
		case Types.CLEAR_ALL_USERS:
			return { ...state, allUsers: [] };
		default:
			return state;
	}
}
