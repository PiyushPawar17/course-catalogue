import axios from 'axios';
import { ADD_TUTORIAL, USER_TUTORIALS } from './types';

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
	axios
		.get('/api/tutorials')
		.then(res => dispatch({ type: USER_TUTORIALS, payload: res.data.tutorials }))
		.catch(err => console.log(err));
};
