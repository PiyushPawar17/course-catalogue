import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Avatar, Tabs, Row, Col } from 'antd';
import { getUserProfile } from '../actions/authActions';

import TutorialCard from './TutorialCard';

import '../styles/Profile.css';

class Profile extends React.Component {
	componentDidMount() {
		this.props.getUserProfile();
	}

	render() {
		let profile;
		if (this.props.auth.loading || !this.props.auth.userProfile) {
			profile = <Icon type="loading" />;
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
						<TutorialCard tutorial={tutorial} favorite={false} />
					</Col>
				));
			}
			profile = (
				<div className="profile">
					<div className="profile-userinfo">
						<div className="profile-avatar">
							<Avatar size={128} icon="user" className="avatar" />
						</div>
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
						<Button type="primary" size="large">
							<Link to="/addtutorial">Submit A Tutorial</Link>
						</Button>
					</main>
				</div>
			);
		}

		return <div>{profile}</div>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getUserProfile }
)(Profile);
