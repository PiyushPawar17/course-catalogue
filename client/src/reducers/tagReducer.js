import { ADD_TAG, GET_TAGS, TAG_LOADING, GET_TAG } from '../actions/types';

const initialState = {
	loading: false,
	tag: {},
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
		case GET_TAG:
			return {
				...state,
				tag: action.payload.tag,
				loading: false
			};
		case ADD_TAG:
			return {
				...state,
				tag: action.payload
			};
		case TAG_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
