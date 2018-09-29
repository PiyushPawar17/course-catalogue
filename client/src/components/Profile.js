import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Avatar, Tabs } from 'antd';
import { getUserProfile } from '../actions/authActions';

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
							<Tabs.TabPane tab="Favorites" key="1">
								Favorites
							</Tabs.TabPane>
							<Tabs.TabPane tab="Submitted Videos" key="2">
								Submitted Videos
							</Tabs.TabPane>
							<Tabs.TabPane tab="Submitted Blogs" key="3">
								Submitted Blogs
							</Tabs.TabPane>
						</Tabs>
						{/* <Button>
							<Link to="/tutorials/new">Submit a tutorial</Link>
						</Button> */}
					</main>
				</div>
			);
		}

		return <div>{profile}</div>;
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserProfile }
)(Profile);
