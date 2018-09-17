import axios from 'axios';
import { ADD_TAG } from './types';

export const addTag = tag => dispatch => {
	axios
		.post('/api/tags', tag)
		.then(res => dispatch({ type: ADD_TAG, payload: res.data }))
		.catch(err => console.log(err));
};
