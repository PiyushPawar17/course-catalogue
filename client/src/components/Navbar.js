import React from 'react';
import { Icon, Popconfirm, Drawer, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logOut, clearCurrentProfile } from '../actions/authActions';

import '../styles/Navbar.css';

class Navbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};

		this.showDrawer = this.showDrawer.bind(this);
		this.onClose = this.onClose.bind(this);
		this.mobileNavigation = this.mobileNavigation.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	showDrawer() {
		this.setState({ visible: true });
	}

	onClose() {
		this.setState({ visible: false });
	}

	mobileNavigation(route) {
		this.props.history.push(route);
		this.onClose();
	}

	logOut(event) {
		event.preventDefault();

		this.props.clearCurrentProfile();
		this.props.logOut(this.props.history);
		this.onClose();
	}

	render() {
		const { authenticated } = this.props.auth;
		let navLinks, smallScreenNavLinks;
		let nlg = 18;
		let nmd = 16;
		if (authenticated) {
			nlg = 16;
			nmd = 13;
			navLinks = (
				<React.Fragment>
					<Col xs={0} sm={0} md={3} lg={2}>
						<div className="navbar-link" onClick={() => this.props.history.push('/profile')}>
							<Icon type="user" /> Profile
						</div>
					</Col>
					<Col xs={0} sm={0} md={3} lg={2}>
						<Popconfirm
							placement="bottom"
							title="Logout?"
							okText="Yes"
							cancelText="Cancel"
							icon={<Icon type="question-circle" theme="outlined" />}
							onConfirm={this.logOut.bind(this)}
						>
							<div className="navbar-link">
								Log Out <Icon type="logout" />
							</div>
						</Popconfirm>
					</Col>
				</React.Fragment>
			);
			smallScreenNavLinks = (
				<React.Fragment>
					<div
						className="small-screen-navbar-link"
						onClick={() => this.mobileNavigation('/profile')}
					>
						<Icon type="user" /> Profile
					</div>
					<Popconfirm
						placement="bottom"
						title="Logout?"
						okText="Yes"
						cancelText="Cancel"
						icon={<Icon type="question-circle" theme="outlined" />}
						onConfirm={this.logOut}
					>
						<div className="small-screen-navbar-link">
							Log Out <Icon type="logout" />
						</div>
					</Popconfirm>
				</React.Fragment>
			);
		} else {
			nlg = 18;
			nmd = 16;
			navLinks = (
				<Col xs={0} sm={0} md={3} lg={2}>
					<div className="navbar-link" onClick={() => this.props.history.push('/login')}>
						Log In <Icon type="login" />
					</div>
				</Col>
			);
			smallScreenNavLinks = (
				<div className="small-screen-navbar-link" onClick={() => this.mobileNavigation('/login')}>
					Log In <Icon type="login" />
				</div>
			);
		}

		return (
			<Row className="navbar" align="middle">
				<Col xs={20} sm={20} md={nmd} lg={nlg} offset={1}>
					<div className="navbar-logo" onClick={() => this.props.history.push('/')}>
						Course Catalogue
					</div>
				</Col>
				<Col xs={0} sm={0} md={3} lg={2}>
					<div className="navbar-link" onClick={() => this.props.history.push('/')}>
						<Icon type="home" /> Home
					</div>
				</Col>
				<Col xs={3} sm={3} md={0}>
					<div className="navbar-link" onClick={this.showDrawer}>
						{this.state.visible ? (
							<Icon type="menu-fold" theme="outlined" />
						) : (
							<Icon type="menu-unfold" theme="outlined" />
						)}
					</div>
				</Col>
				{navLinks}
				<Drawer
					title="Course Catalogue"
					placement="left"
					closable={false}
					onClose={this.onClose}
					visible={this.state.visible}
				>
					<div className="small-screen-navbar-link" onClick={() => this.mobileNavigation('/')}>
						<Icon type="home" /> Home
					</div>
					{smallScreenNavLinks}
				</Drawer>
			</Row>
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
