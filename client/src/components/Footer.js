import React from 'react';
import { Layout, Icon } from 'antd';
import { Link } from 'react-router-dom';

import '../styles/Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<Layout.Footer className="footer">
				<div className="footer-content">
					<ul>
						<li className="footer-links">
							<Link to="/">Home</Link>
						</li>
						<li className="footer-links">
							<Link to="/about">About Us</Link>
						</li>
						<li className="footer-links github">
							<a
								href="https://github.com/PiyushPawar17/course-catalogue"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon type="github" theme="outlined" className="social-icon" />
							</a>
						</li>
					</ul>
				</div>
			</Layout.Footer>
		);
	}
}

export default Footer;
