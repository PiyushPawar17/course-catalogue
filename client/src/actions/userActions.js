import axios from 'axios';
import { USER_TUTORIALS, USER_FAVORITES, LOADING } from './types';

export const getUserTutorials = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/tutorials')
		.then(res => dispatch({ type: USER_TUTORIALS, payload: res.data.tutorials }))
		.catch(err => console.log(err));
};

export const getUserFavorites = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/tutorials/me/favorites')
		.then(res => dispatch({ type: USER_FAVORITES, payload: res.data }))
		.catch(err => console.log(err));
};

export const loading = () => {
	return {
		type: LOADING
	};
};
