import React from 'react';
import { Tabs } from 'antd';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import '../styles/Login.css';

const TabPane = Tabs.TabPane;

class Login extends React.Component {
	render() {
		return (
			<div className="login">
				<Tabs defaultActiveKey="1" className="login-signup-form">
					<TabPane tab="Log In" key="1">
						<LoginForm />
					</TabPane>
					<TabPane tab="Sign Up" key="2">
						<SignUpForm />
					</TabPane>
				</Tabs>
			</div>
		);
	}
}

export default Login;
