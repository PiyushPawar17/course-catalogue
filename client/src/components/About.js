import React from 'react';
import { Divider, Row, Col, Icon } from 'antd';

import '../styles/About.css';

class About extends React.Component {
	render() {
		return (
			<div className="about-page">
				<h1>About Us</h1>
				<Divider className="divider" />
				<p className="about-content">
					Recently the number of online educational sites have grown in huge numbers and so did
					their content. While each one of them claim to provide the best content it is difficult or
					rather tedious for someone to compare the courses of a specific topic offered by each one
					of them and choose the best for themselves. Course Catalogue does all the tedious job and
					brings all the significant details about online courses/tutorials offered by various
					educational sites at a single platform and all one has to do is choose the most suitable
					one for himself/herself and enjoy learning. The main benefit of this platform is that one
					will get information about courses offered by various sites at single platform and hence
					does not have to visit each and every site to find a suitable course according to one’s
					requirements. This will make browsing and decision making easier.
				</p>
				<div className="members">
					<h1>Team Members</h1>
					<Divider className="divider" />
					<Row type="flex" justify="space-between">
						<Col span={4} className="member">
							<div className="member-name">Ishita Das</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/ishita27"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
						<Col span={4} className="member">
							<div className="member-name">Avdhesh Yadav</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/avi-spc"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
						<Col span={4} className="member">
							<div className="member-name">Mohak Khare</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/violentdelight"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
						<Col span={4} className="member">
							<div className="member-name">Piyush Pawar</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/PiyushPawar17"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
						<Col span={4} className="member">
							<div className="member-name">Abhyudai Bisht</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/Midnight-28"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
						<Col span={4} className="member">
							<div className="member-name">Saurabh Pandit</div>
							<div className="member-social">
								<span>
									<a
										href="https://github.com/sp427661"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Icon
											type="github"
											theme="outlined"
											className="about-social-icon github-icon"
										/>
									</a>
								</span>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default About;
