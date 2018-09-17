import axios from 'axios';
import { ADD_TUTORIAL } from './types';

export const addTutorial = (tutorial, history) => dispatch => {
	axios
		.post('/api/tutorials', tutorial)
		.then(res => {
			dispatch({ type: ADD_TUTORIAL, payload: res.data });
			history.push('/profile');
		})
		.catch(err => console.log(err));
};
