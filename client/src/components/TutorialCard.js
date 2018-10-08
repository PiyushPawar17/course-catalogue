import React from 'react';
import { Card, Tag, Skeleton, Tooltip, Icon, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import '../styles/TutorialCard.css';

class TutorialCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'outlined'
		};

		this.changeTheme = this.changeTheme.bind(this);
	}

	changeTheme() {
		const theme = this.state.theme === 'outlined' ? 'filled' : 'outlined';
		this.setState({ theme });
	}

	render() {
		const colors = [
			'#8443de',
			'#ff46ab',
			'#69e52c',
			'#fc972b',
			'#fd313c',
			'#f5f29',
			'#ffb420',
			'#a6e509',
			'#2295ff',
			'#3359f5',
			'#04caca'
		];
		const tags = this.props.tutorial.tags.map((tag, i) => (
			<Tag key={i} color={colors[i % colors.length]}>
				{tag}
			</Tag>
		));

		return (
			<Card className="tutorial-card">
				<Skeleton loading={!this.props.tutorial} active>
					<div className="card-title">
						<Tooltip placement="topLeft" title="Click here for more info">
							<span
								className="tutorial-name"
								onClick={() =>
									this.props.history.push(`/tutorials/${this.props.tutorial._id}`)
								}
							>
								{this.props.tutorial.title}
							</span>
						</Tooltip>
						<Tooltip
							placement="top"
							title={
								this.state.theme === 'outlined' ? 'Add to favorites' : 'Remove from favorites'
							}
						>
							<Icon
								type="heart"
								theme={this.state.theme}
								className="favorite"
								onClick={this.changeTheme}
							/>
						</Tooltip>
					</div>
					<Row gutter={8}>
						<Col span={8}>
							<div className="card-entries">Medium : {this.props.tutorial.medium}</div>
						</Col>
						<Col span={8}>
							<div className="card-entries">Type : {this.props.tutorial.type}</div>
						</Col>
						<Col span={8}>
							<div className="card-entries">Skill Level : {this.props.tutorial.skillLevel}</div>
						</Col>
					</Row>
					<div className="card-entries">{tags}</div>
				</Skeleton>
			</Card>
		);
	}
}

export default withRouter(TutorialCard);
