import { SIGNUP, CLEAR, SET_CURRENT_USER } from '../actions/types';
import { isEmpty } from '../utils/validate';

const initialState = {
	authenticated: false,
	newSignUp: false,
	user: {}
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
		case CLEAR:
			return {
				...state,
				newSignUp: false
			};
		default:
			return state;
	}
}
