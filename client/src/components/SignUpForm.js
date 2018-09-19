import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { validEmail, emptyString, samePassword } from '../utils/validate';
import { signUp } from '../actions/authActions';

import '../styles/SignUpForm.css';

class SignUpForm extends React.Component {
	signUp(event) {
		event.preventDefault();

		if (emptyString(this.refs.name.input.value.trim())) {
			return message.warning('Enter your Name');
		}

		if (emptyString(this.refs.email.input.value.trim())) {
			return message.warning('Enter your Email');
		}

		if (!validEmail(this.refs.email.input.value.trim())) {
			return message.warning('Enter valid email address');
		}

		if (emptyString(this.refs.password.input.value.trim())) {
			return message.warning('Enter your Password');
		}

		if (!samePassword(this.refs.password.input.value, this.refs.confirmPassword.input.value)) {
			return message.error('Two passwords that you enter are inconsistent!');
		}

		const user = {
			name: this.refs.name.input.value,
			email: this.refs.email.input.value,
			password: this.refs.password.input.value
		};

		this.props.signUp(user, this.props.history);
	}

	render() {
		return (
			<Form onSubmit={this.signUp.bind(this)} className="signup-form">
				<Form.Item className="form-item">
					<div className="form-label">Name</div>
					<Input
						prefix={<Icon type="user" className="input-icon" />}
						placeholder="Name"
						ref="name"
					/>
				</Form.Item>
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
					<div className="form-label">Confirm Password</div>
					<Input
						prefix={<Icon type="lock" className="input-icon" />}
						type="password"
						placeholder="Confirm Password"
						ref="confirmPassword"
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="form-button" size="large">
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ signUp }
)(withRouter(SignUpForm));
