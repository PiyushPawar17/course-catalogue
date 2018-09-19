import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Icon, Avatar } from 'antd';
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
					<aside className="profile-sidebar">
						<div className="profile-sidebar-data">
							<div className="avatar">
								<Avatar icon="user" size={90} className="avatar-icon" />
							</div>
							<h2 className="profile-sidebar-name">{this.props.auth.userProfile.name}</h2>
						</div>
						<div className="sidenav">
							<ul>
								<li>Favorites</li>
								<li>Submitted Videos</li>
								<li>Submitted Blogs</li>
								<li>Log Out</li>
							</ul>
						</div>
					</aside>
					<main className="profile-details">
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
