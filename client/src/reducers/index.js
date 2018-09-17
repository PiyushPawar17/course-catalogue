import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tagReducer from './tagReducer';

export default combineReducers({
	auth: authReducer,
	tag: tagReducer
});
