import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Icon } from 'antd';

import '../styles/Navbar.css';

const { Header } = Layout;

class Navbar extends React.Component {
	render() {
		return (
			<Header className="navbar">
				<Link to="/" className="navbar-logo">
					Course Catalogue
				</Link>
				<Link to="/">
					<Button className="navbar-link">
						<Icon type="home" /> Home
					</Button>
				</Link>
				<Link to="/login">
					<Button className="navbar-link">
						Log In <Icon type="login" />
					</Button>
				</Link>
			</Header>
		);
	}
}

export default Navbar;
