import { SIGNUP, CLEAR, SET_CURRENT_USER, USER_PROFILE, LOADING } from '../actions/types';
import { isEmpty } from '../utils/validate';

const initialState = {
	loading: false,
	authenticated: false,
	newSignUp: false,
	user: {},
	userProfile: {}
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
				userProfile: action.payload,
				loading: false
			};
		case CLEAR:
			return {
				...state,
				newSignUp: false
			};
		case LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
