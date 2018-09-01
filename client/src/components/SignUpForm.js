import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import '../styles/SignUpForm.css';

class SignUpForm extends React.Component {
	render() {
		return (
			<Form>
				<Form.Item className="form-item">
					<div className="form-label">Name</div>
					<Input prefix={<Icon type="user" className="input-icon" />} placeholder="Name" />
				</Form.Item>
				<Form.Item className="form-item">
					<div className="form-label">Email</div>
					<Input
						prefix={<Icon type="mail" className="input-icon" />}
						type="email"
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item className="form-item">
					<div className="form-label">Password</div>
					<Input
						prefix={<Icon type="lock" className="input-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item className="form-item">
					<div className="form-label">Confirm Password</div>
					<Input
						prefix={<Icon type="lock" className="input-icon" />}
						type="password"
						placeholder="Confirm Password"
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

export default SignUpForm;
