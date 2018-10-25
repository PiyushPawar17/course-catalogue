import {
	SIGNUP,
	CLEAR,
	SET_CURRENT_USER,
	USER_PROFILE,
	AUTH_LOADING,
	CLEAR_CURRENT_PROFILE,
	INVALID_EMAIL
} from '../actions/types';
import { isEmpty } from '../utils/validate';

const initialState = {
	loading: false,
	authenticated: false,
	newSignUp: false,
	user: {},
	userProfile: {},
	message: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SIGNUP:
			return {
				...state,
				newSignUp: true
			};
		case SET_CURRENT_USER:
			return {
				...state,
				authenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case USER_PROFILE:
			return {
				...state,
				userProfile: action.payload.user,
				loading: false
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state,
				userProfile: {}
			};
		case INVALID_EMAIL:
			return {
				...state,
				message: action.payload.msg
			};
		case CLEAR:
			return {
				...state,
				newSignUp: false,
				message: ''
			};
		case AUTH_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
