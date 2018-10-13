import { ADD_TO_FAVORITES, CLEAR_MESSAGE, REMOVE_FROM_FAVORITES } from '../actions/types';

const initialState = {
	message: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_FAVORITES:
			return {
				...state,
				message: action.payload.msg
			};
		case REMOVE_FROM_FAVORITES:
			return {
				...state,
				message: action.payload.msg
			};
		case CLEAR_MESSAGE:
			return {
				...state,
				message: ''
			};
		default:
			return state;
	}
}
