import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import { clearSignUp } from '../actions/authActions';

class HomePage extends React.Component {
	componentDidMount() {
		if (this.props.auth.newSignUp) {
			message.success('Registration Successful, Sign In to continue');
			setTimeout(() => {
				this.props.clearSignUp();
			}, 2000);
		}
	}

	render() {
		return <div>HomePage</div>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ clearSignUp }
)(HomePage);
