import axios from 'axios';
import { ADD_TUTORIAL, USER_TUTORIALS, GET_TUTORIALS_BY_TAG, LOADING } from './types';

export const addTutorial = (tutorial, history) => dispatch => {
	axios
		.post('/api/tutorials', tutorial)
		.then(res => {
			dispatch({ type: ADD_TUTORIAL, payload: res.data });
			history.push('/profile');
		})
		.catch(err => console.log(err));
};

export const getUserTutorials = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/tutorials')
		.then(res => dispatch({ type: USER_TUTORIALS, payload: res.data.tutorials }))
		.catch(err => console.log(err));
};

export const getTutorialsByTag = tag => dispatch => {
	dispatch(loading());
	axios
		.get(`/api/tutorials/${tag}`)
		.then(res => dispatch({ type: GET_TUTORIALS_BY_TAG, payload: res.data }))
		.catch(err => console.log(err));
};

export const loading = () => {
	return {
		type: LOADING
	};
};
