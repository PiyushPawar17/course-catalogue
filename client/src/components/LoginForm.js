import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { validEmail, emptyString } from '../utils/validate';
import { logIn } from '../actions/authActions';

import '../styles/LoginForm.css';

class LoginForm extends React.Component {
	logIn(event) {
		event.preventDefault();

		if (emptyString(this.refs.email.input.value.trim())) {
			return message.warning('Enter your Email');
		}

		if (!validEmail(this.refs.email.input.value.trim())) {
			return message.warning('Enter valid email address');
		}

		if (emptyString(this.refs.password.input.value.trim())) {
			return message.warning('Enter your Password');
		}

		const user = {
			email: this.refs.email.input.value,
			password: this.refs.password.input.value
		};

		this.props.logIn(user, this.props.history);
	}

	render() {
		return (
			<Form onSubmit={this.logIn.bind(this)}>
				<Form.Item className="form-item">
					<div className="form-label">Email</div>
					<Input
						prefix={<Icon type="mail" className="input-icon" />}
						type="email"
						placeholder="Email"
						ref="email"
					/>
				</Form.Item>
				<Form.Item className="form-item">
					<div className="form-label">Password</div>
					<Input
						prefix={<Icon type="lock" className="input-icon" />}
						type="password"
						placeholder="Password"
						ref="password"
					/>
				</Form.Item>
				<Form.Item className="form-item">
					<Button type="primary" htmlType="submit" className="form-button" size="large">
						Log in
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

export default connect(
	null,
	{ logIn }
)(withRouter(LoginForm));
