import { ADD_TUTORIAL, USER_TUTORIALS, GET_TUTORIALS_BY_TAG, LOADING } from '../actions/types';

const initialState = {
	loading: false,
	tutorial: null,
	tutorials: [],
	tag: '',
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
				userTutorials: action.payload,
				loading: false
			};
		case GET_TUTORIALS_BY_TAG:
			return {
				...state,
				tutorials: action.payload.tutorials,
				loading: false
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
