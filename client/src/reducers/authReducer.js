import { SIGNUP, CLEAR } from '../actions/types';

const initialState = {
	authenticated: false,
	newSignUp: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SIGNUP:
			console.log('SignUp');
			return {
				...state,
				newSignUp: true
			};
		case CLEAR:
			console.log('Clear');
			return {
				...state,
				newSignUp: false
			};
		default:
			return state;
	}
}
