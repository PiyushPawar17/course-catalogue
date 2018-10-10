import axios from 'axios';
import { ADD_TUTORIAL, GET_TUTORIALS_BY_TAG, GET_TUTORIAL, TUTORIAL_LOADING } from './types';

export const addTutorial = (tutorial, history) => dispatch => {
	axios
		.post('/api/tutorials', tutorial)
		.then(res => {
			dispatch({ type: ADD_TUTORIAL, payload: res.data });
			history.push('/profile');
		})
		.catch(err => console.log(err));
};

export const getTutorialsByTag = tag => dispatch => {
	dispatch(loading());
	axios
		.get(`/api/tutorials/tag/${tag}`)
		.then(res => dispatch({ type: GET_TUTORIALS_BY_TAG, payload: res.data }))
		.catch(err => console.log(err));
};

export const getTutorial = id => dispatch => {
	dispatch(loading());
	axios
		.get(`/api/tutorials/${id}`)
		.then(res => dispatch({ type: GET_TUTORIAL, payload: res.data }))
		.catch(err => console.log(err));
};

export const addReview = (tutorial, review) => dispatch => {
	axios
		.post(`/api/tutorials/review/${tutorial}`, review)
		.then(res => dispatch(getTutorial(tutorial)))
		.catch(err => console.log(err));
};

export const loading = () => {
	return {
		type: TUTORIAL_LOADING
	};
};
