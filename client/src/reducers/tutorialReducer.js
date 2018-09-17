import { ADD_TUTORIAL } from '../actions/types';

const initialState = {
	tutorial: null,
	tutorials: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TUTORIAL:
			return {
				...state,
				tutorial: action.payload
			};
		default:
			return state;
	}
}
