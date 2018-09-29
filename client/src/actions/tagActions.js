import axios from 'axios';
import { ADD_TAG, GET_TAGS, LOADING } from './types';

export const getTags = () => dispatch => {
	dispatch(loading());
	axios
		.get('/api/tags')
		.then(res => dispatch({ type: GET_TAGS, payload: res.data.tags }))
		.catch(err => console.log(err));
};

export const addTag = tag => dispatch => {
	axios
		.post('/api/tags', tag)
		.then(res => dispatch({ type: ADD_TAG, payload: res.data }))
		.catch(err => console.log(err));
};

export const loading = () => {
	return {
		type: LOADING
	};
};
