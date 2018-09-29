import React from 'react';
import { Card, Tag, Rate } from 'antd';

import '../styles/TutorialCard.css';

class TutorialCard extends React.Component {
	render() {
		const colors = [
			'#eb2f96',
			'#13c2c2',
			'#f5222d',
			'#52c41a',
			'#fa541c',
			'#fa8c16',
			'#722ed1',
			'#faad14',
			'#a0d911',
			'#1890ff',
			'#2f54eb'
		];
		const tags = this.props.tags.map((tag, i) => (
			<Tag key={i} color={colors[i % colors.length]}>
				{tag}
			</Tag>
		));
		const star =
			this.props.skillLevel === 'Beginner' ? 1 : this.props.skillLevel === 'Intermediate' ? 2 : 3;
		return (
			<Card title={this.props.title} className="tutorial-card">
				<div className="card-entries">Link : {this.props.link}</div>
				<div className="card-entries">Medium : {this.props.medium}</div>
				<div className="card-entries">Educator : {this.props.educator}</div>
				<div className="card-entries">Type : {this.props.type}</div>
				<div className="card-entries">
					Skill Level : <Rate disabled count={3} value={star} />
				</div>
				<div className="card-entries">{tags}</div>
			</Card>
		);
	}
}

export default TutorialCard;
