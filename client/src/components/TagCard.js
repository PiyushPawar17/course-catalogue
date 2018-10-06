import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import '../styles/TagCard.css';

class TagCard extends React.Component {
	render() {
		return (
			<Card className="tag-card">
				<Link
					to={`/tutorials/tag/${this.props.tag.tag
						.toLowerCase()
						.split(' ')
						.join('-')}`}
				>
					<div className="tag-card-title">{this.props.tag.tag}</div>
					<div className="tag-card-description">{this.props.tag.description}</div>
				</Link>
				{this.props.tag.website ? (
					<div className="tag-card-website">
						Official Website :{' '}
						<a href={this.props.tag.website} target="_blank">
							<span className="website-link">{this.props.tag.website}</span>
						</a>
					</div>
				) : null}
			</Card>
		);
	}
}

export default TagCard;
