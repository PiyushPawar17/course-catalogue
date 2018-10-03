import React from 'react';
import { Icon, Tag, Divider, Button } from 'antd';
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
					<div className="tutorial-info">Submitted By : {tutorial.submittedBy.name}</div>
					<div className="tutorial-info">
						Submitted On : {moment(tutorial.submittedOn).format('MMMM D, YYYY')}
					</div>
					<Button type="primary">Visit Tutorial</Button>
					<Divider className="divider" />
					<div className="tutorial-info">Educator : {tutorial.educator}</div>
					<div className="tutorial-info">Medium : {tutorial.medium}</div>
					<div className="tutorial-info">Type : {tutorial.type}</div>
					<div className="tutorial-info">Skill Level : {tutorial.skillLevel}</div>
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
