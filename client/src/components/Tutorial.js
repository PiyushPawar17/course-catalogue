import React from 'react';
import { Icon, Tag, Divider, Button, Input, message } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getTutorial, addReview } from '../actions/tutorialActions';
import { addToFavorites, clearMessage } from '../actions/userActions';

import '../styles/Tutorial.css';

class Tutorial extends React.Component {
	constructor(props) {
		super(props);

		this.addReview = this.addReview.bind(this);
		this.addToFavorites = this.addToFavorites.bind(this);
	}

	componentDidMount() {
		this.props.getTutorial(this.props.match.params.tutorial);
	}

	addToFavorites() {
		this.props.addToFavorites(this.props.match.params.tutorial);
		message.success('Tutorial added to favorites');
		setTimeout(() => this.props.clearMessage(), 3000);
	}

	addReview() {
		if (this.refs.review.textAreaRef.value.trim() === '') {
			return message.info('Enter a review');
		}

		const newReview = {
			review: this.refs.review.textAreaRef.value
		};

		this.props.addReview(this.props.match.params.tutorial, newReview);
		this.refs.review.textAreaRef.value = '';
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
			let tags;
			if (tutorial.tags) {
				tags = tutorial.tags.map((tag, i) => (
					<Tag key={i} color={colors[i % colors.length]}>
						{tag}
					</Tag>
				));
			} else {
				tags = null;
			}

			let reviews;

			if (tutorial.reviews.length === 0 || !tutorial.reviews) {
				reviews = <div className="nothing-to-show review">No Reviews Yet</div>;
			} else {
				reviews = tutorial.reviews.map((review, i) => (
					<div className="review" key={i}>
						<div className="reviewed-by">{review.reviewedBy.name}</div>
						<div className="review-content">{review.review}</div>
					</div>
				));
			}

			tutorialPage = (
				<div>
					<h1 className="tutorial-title-name">
						{tutorial.title}{' '}
						<span>
							<Button type="primary" className="favorite-button" onClick={this.addToFavorites}>
								Add to Favorites
							</Button>
						</span>
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
					<Divider className="divider" />
					<div className="reviews">
						<div className="tutorial-info">
							<span className="bold">Reviews</span>
						</div>
						<Input.TextArea
							rows={1}
							placeholder="Add a review"
							className="review-text"
							ref="review"
						/>
						<Button type="primary" onClick={this.addReview}>
							Submit
						</Button>
						{reviews}
					</div>
				</div>
			);
		}

		return <div className="tutorial">{tutorialPage}</div>;
	}
}

Tutorial.propTypes = {
	tutorial: PropTypes.object.isRequired,
	getTutorial: PropTypes.func.isRequired,
	addReview: PropTypes.func.isRequired,
	addToFavorites: PropTypes.func.isRequired,
	clearMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getTutorial, addReview, addToFavorites, clearMessage }
)(Tutorial);
