import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import '../styles/Login.css';

class Login extends React.Component {
	componentDidMount() {
		if (this.props.auth.authenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.authenticated) {
			this.props.history.push('/');
		}
	}

	render() {
		return (
			<div className="login">
				<Tabs defaultActiveKey="1" className="login-signup-form">
					<Tabs.TabPane tab="Log In" key="1">
						<LoginForm />
					</Tabs.TabPane>
					<Tabs.TabPane tab="Sign Up" key="2">
						<SignUpForm />
					</Tabs.TabPane>
				</Tabs>
			</div>
		);
	}
}

Login.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Login);
