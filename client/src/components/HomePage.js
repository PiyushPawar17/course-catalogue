import React from 'react';
import { Row, Col, message } from 'antd';
import { Element } from 'react-scroll';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header';
import TagCard from './TagCard';
import Loader from './Loader';

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
			tags = <Loader />;
		} else {
			if (this.props.tag.tags.length === 0) {
				tags = <div className="nothing-to-show">No tutorials submitted yet</div>;
			} else {
				tags = this.props.tag.tags.map((tag, i) => (
					<Col
						key={i}
						sm={{ span: 20, offset: 2 }}
						md={{ span: 10, offset: 1 }}
						xl={{ span: 8, offset: 0 }}
					>
						<TagCard tag={tag} />
					</Col>
				));
			}
		}

		return (
			<div className="home-page">
				<Header />
				<div className="homepage-tags">
					<div className="homepage-tags-header">Tutorials</div>
					<Element name="tags">
						<Row gutter={{ sm: 0, md: 4, xl: 8 }}>{tags}</Row>
					</Element>
				</div>
			</div>
		);
	}
}

HomePage.propTypes = {
	auth: PropTypes.object.isRequired,
	tag: PropTypes.object.isRequired,
	getTags: PropTypes.func.isRequired,
	clearSignUp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	tag: state.tag
});

export default connect(
	mapStateToProps,
	{ clearSignUp, getTags }
)(HomePage);
