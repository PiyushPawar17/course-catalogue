import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Avatar, Tabs, Row, Col } from 'antd';
import { getUserProfile } from '../actions/authActions';
import { getUserTutorials } from '../actions/tutorialActions';

import TutorialCard from './TutorialCard';

import '../styles/Profile.css';

class Profile extends React.Component {
	componentDidMount() {
		this.props.getUserProfile();
		this.props.getUserTutorials();
	}

	render() {
		let profile;
		if (this.props.auth.loading || !this.props.auth.userProfile) {
			profile = <Icon type="loading" />;
		} else {
			const favorites = this.props.tutorial.userTutorials.map((tutorial, i) => (
				<Col span={8} key={i}>
					<TutorialCard tutorial={tutorial} />
				</Col>
			));
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
								<Row gutter={8}>{favorites}</Row>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Submitted Blogs" key="3" className="tab-content">
								<Row gutter={8}>{favorites}</Row>
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
	{ getUserProfile, getUserTutorials }
)(Profile);
