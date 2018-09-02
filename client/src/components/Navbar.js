import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';

import '../styles/Navbar.css';

const { Header } = Layout;

class Navbar extends React.Component {
	logOut(event) {
		event.preventDefault();

		this.props.logOut();
	}

	render() {
		const { authenticated } = this.props.auth;
		let navLinks;

		if (authenticated) {
			navLinks = (
				<a href="#">
					<Button className="navbar-link" onClick={this.logOut.bind(this)}>
						Log Out <Icon type="logout" />
					</Button>
				</a>
			);
		} else {
			navLinks = (
				<Link to="/login">
					<Button className="navbar-link">
						Log In <Icon type="login" />
					</Button>
				</Link>
			);
		}

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
				{navLinks}
			</Header>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logOut }
)(Navbar);
