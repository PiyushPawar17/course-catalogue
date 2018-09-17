import { ADD_TAG } from '../actions/types';

const initialState = {
	tag: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TAG:
			return {
				...state,
				tag: action.payload
			};
		default:
			return state;
	}
}
