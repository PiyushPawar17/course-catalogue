import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logOut, getUserProfile, clearCurrentProfile } from '../actions/authActions';

import ScrollToTop from './hoc/ScrollToTop';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Profile from './Profile';
import TutorialForm from './TutorialForm';
import Tutorials from './Tutorials';
import Tutorial from './Tutorial';
import About from './About';
import Footer from './Footer';

import '../styles/Base.css';

// Check for token in local storage
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set current user
	store.dispatch(setCurrentUser(decoded));
	// Get User Data
	store.dispatch(getUserProfile());
	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logOut());
		// Clear user profile
		store.dispatch(clearCurrentProfile());
		// Redirect to homepage
		window.location.href = '/';
	}
}

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<ScrollToTop>
							<Switch>
								<Route exact path="/" component={HomePage} />
								<Route exact path="/login" component={Login} />
								<PrivateRoute exact path="/profile" component={Profile} />
								<PrivateRoute exact path="/addtutorial" component={TutorialForm} />
								<Route exact path="/tutorials/tag/:tag" component={Tutorials} />
								<Route exact path="/tutorials/:tutorial" component={Tutorial} />
								<Route exact path="/about" component={About} />
							</Switch>
						</ScrollToTop>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
