import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Button } from 'antd';

import '../styles/Navbar.css';

const { Header } = Layout;

class Navbar extends React.Component {
	render() {
		return (
			<Header className="navbar">
				<Row type="flex">
					<Col span={15} offset={2}>
						<Link to="/" className="navbar-logo">
							Course Catalogue
						</Link>
					</Col>
					<Col span={2}>
						<Button className="navbar-link">
							<Link to="/">Home</Link>
						</Button>
					</Col>
					<Col span={3}>
						<Button className="navbar-link">
							<Link to="/login">Log In / Sign Up</Link>
						</Button>
					</Col>
				</Row>
			</Header>
		);
	}
}

export default Navbar;
