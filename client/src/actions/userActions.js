import axios from 'axios';
import { ADD_TO_FAVORITES, CLEAR_MESSAGE, REMOVE_FROM_FAVORITES } from './types';

export const addToFavorites = tutorial => dispatch => {
	axios
		.post(`/api/tutorials/me/addfavorite/${tutorial}`)
		.then(res => dispatch({ type: ADD_TO_FAVORITES, payload: res.data }))
		.catch(err => console.log(err));
};

export const removeFromFavorites = tutorial => dispatch => {
	axios
		.delete(`/api/tutorials/me/removefavorite/${tutorial}`)
		.then(res => dispatch({ type: REMOVE_FROM_FAVORITES, payload: res.data }))
		.catch(err => console.log(err));
};

export const clearMessage = () => {
	return {
		type: CLEAR_MESSAGE
	};
};
