import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

class Profile extends React.Component {
	render() {
		return (
			<div className="profile">
				<Button>
					<Link to="/tutorials/new">Submit a tutorial</Link>
				</Button>
			</div>
		);
	}
}

export default Profile;
