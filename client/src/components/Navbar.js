import React from 'react';
import { Layout, Button, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logOut, clearCurrentProfile } from '../actions/authActions';

import '../styles/Navbar.css';

class Navbar extends React.Component {
	logOut(event) {
		event.preventDefault();

		this.props.clearCurrentProfile();
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
					<Popconfirm
						placement="bottom"
						title="Logout?"
						okText="Yes"
						cancelText="Cancel"
						icon={<Icon type="question-circle" theme="outlined" />}
						onConfirm={this.logOut.bind(this)}
					>
						<a href="#">
							<Button className="navbar-link">
								Log Out <Icon type="logout" />
							</Button>
						</a>
					</Popconfirm>
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
			<Layout.Header className="navbar">
				<Link to="/" className="navbar-logo" style={{ width: navbarLogoWidth }}>
					Course Catalogue
				</Link>
				<Link to="/">
					<Button className="navbar-link">
						<Icon type="home" /> Home
					</Button>
				</Link>
				{navLinks}
			</Layout.Header>
		);
	}
}

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logOut, clearCurrentProfile }
)(withRouter(Navbar));
