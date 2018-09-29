import { ADD_TUTORIAL, USER_TUTORIALS } from '../actions/types';

const initialState = {
	tutorial: null,
	tutorials: [],
	userTutorials: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TUTORIAL:
			return {
				...state,
				tutorial: action.payload
			};
		case USER_TUTORIALS:
			return {
				...state,
				userTutorials: action.payload
			};
		default:
			return state;
	}
}
