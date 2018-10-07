import React from 'react';
import { Icon, Tag, Divider, Button, Rate, Input, Tooltip } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTutorial } from '../actions/tutorialActions';

import '../styles/Tutorial.css';

class Tutorial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			theme: 'outlined'
		};

		this.changeTheme = this.changeTheme.bind(this);
	}

	componentDidMount() {
		this.props.getTutorial(this.props.match.params.tutorial);
	}

	changeTheme() {
		const theme = this.state.theme === 'outlined' ? 'filled' : 'outlined';
		this.setState({ theme });
	}

	render() {
		const { tutorial } = this.props.tutorial;
		let tutorialPage;
		if (this.props.tutorial.loading || !tutorial) {
			tutorialPage = <Icon type="loading" />;
		} else {
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
			const tags = tutorial.tags.map((tag, i) => (
				<Tag key={i} color={colors[i % colors.length]}>
					{tag}
				</Tag>
			));
			tutorialPage = (
				<div>
					<h1 className="tutorial-title-name">
						{tutorial.title}{' '}
						<Tooltip
							placement="top"
							title={
								this.state.theme === 'outlined' ? 'Add to favorites' : 'Remove from favorites'
							}
						>
							<Icon
								type="heart"
								theme={this.state.theme}
								className="favorite tutorial-page-fav"
								onClick={this.changeTheme}
							/>
						</Tooltip>
					</h1>
					<div className="tutorial-tags">{tags}</div>
					<div className="tutorial-info">
						<span className="bold">Submitted By :</span> {tutorial.submittedBy.name}
					</div>
					<div className="tutorial-info">
						<span className="bold">Submitted On :</span>{' '}
						{moment(tutorial.submittedOn).format('MMMM D, YYYY')}
					</div>
					<Button type="primary">
						<a href={tutorial.link} target="_blank">
							Visit Tutorial
						</a>
					</Button>
					<Divider className="divider" />
					<div className="tutorial-info">
						<span className="bold">Educator :</span> {tutorial.educator}
					</div>
					<div className="tutorial-info">
						<span className="bold">Medium :</span> {tutorial.medium}
					</div>
					<div className="tutorial-info">
						<span className="bold">Type :</span> {tutorial.type}
					</div>
					<div className="tutorial-info">
						<span className="bold">Skill Level :</span> {tutorial.skillLevel}
					</div>
					<div className="tutorial-info">
						<span className="bold">Description :</span> {tutorial.description}
					</div>
					<div className="tutorial-info">
						<span className="bold">Rating :</span> <Rate disabled allowHalf value={2.5} />
					</div>
					<Divider className="divider" />
					<div className="reviews">
						<div className="tutorial-info">
							<span className="bold">Reviews</span>
						</div>
						<Input.TextArea rows={1} placeholder="Add a review" className="review-text" />
						<Button type="primary">Submit</Button>
					</div>
				</div>
			);
		}

		return <div className="tutorial">{tutorialPage}</div>;
	}
}

const mapStateToProps = state => ({
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getTutorial }
)(Tutorial);
