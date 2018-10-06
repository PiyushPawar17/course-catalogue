import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tagReducer from './tagReducer';
import tutorialReducer from './tutorialReducer';
import userReducer from './userReducer';

export default combineReducers({
	auth: authReducer,
	tag: tagReducer,
	tutorial: tutorialReducer,
	user: userReducer
});
