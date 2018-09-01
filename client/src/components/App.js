import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

import Navbar from './Navbar';
import Login from './Login';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Navbar />
						<Switch>
							<Route path="/login" component={Login} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
