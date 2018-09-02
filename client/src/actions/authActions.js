import axios from 'axios';
import { SIGNUP, CLEAR } from './types';

export const signUp = (user, history) => dispatch => {
	axios
		.post('/api/users/register', user)
		.then(res => {
			dispatch({ type: SIGNUP, payload: res.data });
			history.push('/');
		})
		.catch(err => console.log(err));
};

export const clearSignUp = () => {
	return {
		type: CLEAR
	};
};
