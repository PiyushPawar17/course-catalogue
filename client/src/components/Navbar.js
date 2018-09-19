import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { logOut } from '../actions/authActions';

import '../styles/Navbar.css';

const { Header } = Layout;

class Navbar extends React.Component {
	logOut(event) {
		event.preventDefault();

		this.props.logOut(this.props.history);
	}

	render() {
		const { authenticated } = this.props.auth;
		let navLinks;
		let navbarLogoWidth = '75%';
		if (authenticated) {
			navbarLogoWidth = '65%';
			navLinks = (
				<React.Fragment>
					<Link to="/profile">
						<Button className="navbar-link">
							<Icon type="user" /> Profile
						</Button>
					</Link>
					<a href="#">
						<Button className="navbar-link" onClick={this.logOut.bind(this)}>
							Log Out <Icon type="logout" />
						</Button>
					</a>
				</React.Fragment>
			);
		} else {
			navbarLogoWidth = '75%';
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
				<Link to="/" className="navbar-logo" style={{ width: navbarLogoWidth }}>
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
)(withRouter(Navbar));
