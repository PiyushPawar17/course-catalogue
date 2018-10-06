import React from 'react';
import { Icon, Tag, Divider, Button, Rate, Input } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import { getTutorial } from '../actions/tutorialActions';

import '../styles/Tutorial.css';

class Tutorial extends React.Component {
	componentDidMount() {
		this.props.getTutorial(this.props.match.params.tutorial);
	}

	render() {
		console.log(this.props.tutorial.tutorial);
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
					<h1>{tutorial.title}</h1>
					<div className="tutorial-tags">{tags}</div>
					<div className="tutorial-info">
						<span className="bold">Submitted By :</span> {tutorial.submittedBy.name}
					</div>
					<div className="tutorial-info">
						<span className="bold">Submitted On :</span>{' '}
						{moment(tutorial.submittedOn).format('MMMM D, YYYY')}
					</div>
					<Button type="primary">Visit Tutorial</Button>
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
						<span className="bold">Description :</span> Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Mauris consequat placerat lorem non volutpat. Cras mattis ligula ac
						gravida fermentum. Mauris porttitor, nulla nec luctus pulvinar, lorem enim volutpat
						orci, eu egestas magna quam vel turpis. Suspendisse nec neque mauris. Nunc eu tortor
						dolor. Ut vulputate nunc vel ex efficitur tempus sed ut magna. Ut pharetra viverra
						orci, at laoreet justo finibus id. Ut a venenatis mi. In lacinia dignissim efficitur.
						In venenatis tortor non suscipit venenatis. Maecenas mollis dignissim nibh, vel
						pellentesque elit mollis non. Aliquam viverra gravida tincidunt. Donec metus sapien,
						dapibus sed est a, interdum sollicitudin mauris. Quisque ut ex a eros suscipit
						suscipit. Mauris laoreet porttitor turpis, ac tempus arcu aliquam et. Aenean eu metus
						vel nisi varius porttitor. In fermentum, dui sit amet eleifend venenatis, magna ligula
						gravida libero, non consequat est urna id turpis.
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
