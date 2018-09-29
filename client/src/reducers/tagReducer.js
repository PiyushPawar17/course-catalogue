import { ADD_TAG, GET_TAGS, LOADING } from '../actions/types';

const initialState = {
	loading: false,
	tag: '',
	tags: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_TAGS:
			return {
				...state,
				tags: action.payload,
				loading: false
			};
		case ADD_TAG:
			return {
				...state,
				tag: action.payload
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
