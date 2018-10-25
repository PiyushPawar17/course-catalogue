import React from 'react';
import { Button, Icon, Tabs, Row, Col } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserProfile } from '../actions/authActions';

import TutorialCard from './TutorialCard';
import Loader from './Loader';

import '../styles/Profile.css';

class Profile extends React.Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		let profile;
		if (this.props.auth.loading || !this.props.auth.userProfile) {
			profile = <Loader />;
		} else {
			const videos = this.props.auth.userProfile.submittedTutorials.filter(
				tutorial => tutorial.medium === 'Video'
			);
			const blogs = this.props.auth.userProfile.submittedTutorials.filter(
				tutorial => tutorial.medium === 'Blog'
			);
			let favorites;
			let submittedVideos;
			let submittedBlogs;
			if (videos.length === 0) {
				submittedVideos = <div className="nothing-to-show">No video tutorials submitted yet</div>;
			} else {
				submittedVideos = videos.map((tutorial, i) => (
					<Col span={24} key={i}>
						<TutorialCard tutorial={tutorial} />
					</Col>
				));
			}
			if (blogs.length === 0) {
				submittedBlogs = <div className="nothing-to-show">No blogs submitted yet</div>;
			} else {
				submittedBlogs = blogs.map((tutorial, i) => (
					<Col span={24} key={i}>
						<TutorialCard tutorial={tutorial} />
					</Col>
				));
			}
			if (this.props.auth.userProfile.favorites.length === 0) {
				favorites = <div className="nothing-to-show">Nothing in favorites</div>;
			} else {
				favorites = this.props.auth.userProfile.favorites.map((tutorial, i) => (
					<Col span={24} key={i}>
						<TutorialCard tutorial={tutorial} />
					</Col>
				));
			}
			profile = (
				<div className="profile">
					<div className="profile-userinfo">
						<div className="profile-username">{this.props.auth.user.name}</div>
						<div className="profile-useremail">
							<Icon type="mail" /> {this.props.auth.user.email}
						</div>
					</div>
					<main className="profile-details">
						<Tabs defaultActiveKey="1" size="large">
							<Tabs.TabPane tab="Favorites" key="1" className="tab-content">
								<Row gutter={8}>{favorites}</Row>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Submitted Videos" key="2" className="tab-content">
								<Row gutter={8}>{submittedVideos}</Row>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Submitted Blogs" key="3" className="tab-content">
								<Row gutter={8}>{submittedBlogs}</Row>
							</Tabs.TabPane>
						</Tabs>
						<Button
							type="primary"
							size="large"
							onClick={() => this.props.history.push('/addtutorial')}
						>
							Submit A Tutorial
						</Button>
					</main>
				</div>
			);
		}

		return <div>{profile}</div>;
	}
}

Profile.propTypes = {
	auth: PropTypes.object.isRequired,
	tutorial: PropTypes.object.isRequired,
	getUserProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getUserProfile }
)(Profile);
