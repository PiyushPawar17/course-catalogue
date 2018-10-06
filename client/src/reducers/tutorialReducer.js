import { ADD_TUTORIAL, GET_TUTORIALS_BY_TAG, GET_TUTORIAL, LOADING } from '../actions/types';

const initialState = {
	loading: false,
	tutorial: null,
	tutorials: [],
	tag: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TUTORIAL:
			return {
				...state,
				tutorial: action.payload
			};
		case GET_TUTORIAL:
			return {
				...state,
				tutorial: action.payload.tutorial,
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
