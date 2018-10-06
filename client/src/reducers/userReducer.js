import { USER_TUTORIALS, LOADING, USER_FAVORITES } from '../actions/types';

const initialState = {
	loading: false,
	favorites: [],
	submittedTutorials: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case USER_TUTORIALS:
			return {
				...state,
				submittedTutorials: action.payload,
				loading: false
			};
		case USER_FAVORITES:
			return {
				...state,
				favorites: action.payload.favorites,
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
