import {
	ADD_TUTORIAL,
	GET_TUTORIALS_BY_TAG,
	GET_TUTORIAL,
	TUTORIAL_LOADING,
	ADD_UPVOTE,
	REMOVE_UPVOTE,
	CLEAR_UPVOTE_MESSAGE
} from '../actions/types';

const initialState = {
	loading: false,
	tutorial: null,
	tutorials: [],
	tag: '',
	message: ''
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
		case TUTORIAL_LOADING:
			return {
				...state,
				loading: true
			};
		case ADD_UPVOTE:
			return {
				...state,
				message: action.payload.msg
			};
		case REMOVE_UPVOTE:
			return {
				...state,
				message: action.payload.msg
			};
		case CLEAR_UPVOTE_MESSAGE:
			return {
				...state,
				message: ''
			};
		default:
			return state;
	}
}
