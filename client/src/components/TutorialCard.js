import React from 'react';
import { Card, Tag, Skeleton, Tooltip, Icon, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';

import '../styles/TutorialCard.css';

class TutorialCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			favoriteTheme: 'outlined',
			upvote: false
		};

		this.changeFavoriteTheme = this.changeFavoriteTheme.bind(this);
		this.changeUpvoteColor = this.changeUpvoteColor.bind(this);
	}

	changeFavoriteTheme() {
		const favoriteTheme = this.state.favoriteTheme === 'outlined' ? 'filled' : 'outlined';
		this.setState({ favoriteTheme });
	}

	changeUpvoteColor() {
		const upvote = this.state.upvote;
		this.setState({ upvote: !upvote });
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
						<div className="upvotes">
							<div
								className="upvote-icon"
								onClick={this.changeUpvoteColor}
								className={this.state.upvote ? 'upvoted' : ''}
							>
								<Icon type="caret-up" theme="outlined" />
							</div>
							<Tooltip placement="left" title="Upvotes">
								<small>4</small>
							</Tooltip>
						</div>
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
								this.state.favoriteTheme === 'outlined'
									? 'Add to favorites'
									: 'Remove from favorites'
							}
						>
							<Icon
								type="heart"
								theme={this.state.favoriteTheme}
								className="favorite"
								onClick={this.changeFavoriteTheme}
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
