import React from 'react';
import { Card, Tag, Rate, Skeleton, Tooltip } from 'antd';

import '../styles/TutorialCard.css';

class TutorialCard extends React.Component {
	render() {
		const colors = [
			'#722ed1',
			'#eb2f96',
			'#52c41a',
			'#fa8c16',
			'#f5222d',
			'#fa541c',
			'#faad14',
			'#a0d911',
			'#1890ff',
			'#2f54eb',
			'#13c2c2'
		];
		const tags = this.props.tutorial.tags.map((tag, i) => (
			<Tag key={i} color={colors[i % colors.length]}>
				{tag}
			</Tag>
		));
		const star =
			this.props.tutorial.skillLevel === 'Beginner'
				? 1
				: this.props.tutorial.skillLevel === 'Intermediate'
					? 2
					: 3;
		return (
			<Card title={this.props.tutorial.title} className="tutorial-card">
				<Skeleton loading={!this.props.tutorial} active>
					<div className="card-entries">Link : {this.props.tutorial.link}</div>
					<div className="card-entries">Medium : {this.props.tutorial.medium}</div>
					<div className="card-entries">Educator : {this.props.tutorial.educator}</div>
					<div className="card-entries">Type : {this.props.tutorial.type}</div>
					<div className="card-entries">
						<Tooltip placement="right" title={this.props.tutorial.skillLevel}>
							Skill Level : <Rate disabled count={3} value={star} />
						</Tooltip>
					</div>
					<div className="card-entries">{tags}</div>
				</Skeleton>
			</Card>
		);
	}
}

export default TutorialCard;
