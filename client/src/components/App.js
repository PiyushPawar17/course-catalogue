import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import { Button } from 'antd';

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Button type="primary">Primary</Button>
			</Provider>
		);
	}
}

export default App;
