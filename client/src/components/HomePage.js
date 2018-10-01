import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Icon, message } from 'antd';
import TagCard from './TagCard';

import { clearSignUp } from '../actions/authActions';
import { getTags } from '../actions/tagActions';

import '../styles/HomePage.css';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.getTags();

		if (this.props.auth.newSignUp) {
			message.success('Registration Successful, Sign In to continue');
			setTimeout(() => {
				this.props.clearSignUp();
			}, 2000);
		}
	}

	render() {
		let tags;
		if (this.props.tag.loading || !this.props.tag.tags) {
			tags = <Icon type="loading" />;
		} else {
			tags = this.props.tag.tags.map(tag => (
				<Col span={8}>
					<TagCard tag={tag} />
				</Col>
			));
		}

		return (
			<div className="home-page">
				<Row gutter={8}>{tags}</Row>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	tag: state.tag
});

export default connect(
	mapStateToProps,
	{ clearSignUp, getTags }
)(HomePage);
