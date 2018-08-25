import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

import Navbar from './Navbar';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="app">
						<Navbar />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
