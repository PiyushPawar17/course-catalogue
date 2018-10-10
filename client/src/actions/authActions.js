import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { SIGNUP, CLEAR, SET_CURRENT_USER, USER_PROFILE, AUTH_LOADING } from './types';

export const signUp = (user, history) => dispatch => {
	axios
		.post('/api/users/register', user)
		.then(res => {
			dispatch({ type: SIGNUP, payload: res.data });
			history.push('/');
		})
		.catch(err => console.log(err));
};

export const logIn = user => dispatch => {
	axios
		.post('/api/users/login', user)
		.then(res => {
			// Save / Set token to local storage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set auth header
			setAuthToken(token);
			// Decode token to get data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
			dispatch(getUserProfile());
		})
		.catch(err => console.log(err));
};

export const logOut = history => dispatch => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header
	setAuthToken(false);
	// Set current user to {}
	dispatch(setCurrentUser({}));
	if (history) history.push('/');
	else window.location.href = '/';
};

export const getUserProfile = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/users/me')
		.then(res => dispatch({ type: USER_PROFILE, payload: res.data }))
		.catch(err => console.log(err));
};

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const loading = () => {
	return {
		type: AUTH_LOADING
	};
};

export const clearSignUp = () => {
	return {
		type: CLEAR
	};
};
