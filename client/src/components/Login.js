import React from 'react';
import { Tabs, Row, Col } from 'antd';
import Typist from 'react-typist';
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
				<Row>
					<Col xs={0} sm={0} md={12}>
						<div className="login-info">
							<Typist cursor={{ show: false }}>
								<div className="login-header">Find the best tutorials from</div>
								<div className="websites">Udemy</div>
								<div className="websites">Udacity</div>
								<div className="websites">Edx</div>
								<div className="websites">Lynda</div>
								<div className="websites">Medium</div>
								<div className="websites">YouTube</div>
								<div className="websites">Coursera</div>
								<div className="websites">and many more...</div>
							</Typist>
						</div>
					</Col>
					<Col xs={24} sm={24} md={12}>
						<Tabs defaultActiveKey="1" className="login-signup-form">
							<Tabs.TabPane tab="Log In" key="1">
								<LoginForm />
							</Tabs.TabPane>
							<Tabs.TabPane tab="Sign Up" key="2">
								<SignUpForm />
							</Tabs.TabPane>
						</Tabs>
					</Col>
				</Row>
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
