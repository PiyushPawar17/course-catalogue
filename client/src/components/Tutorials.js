import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTag } from '../actions/tagActions';
import { getTutorialsByTag } from '../actions/tutorialActions';

import TutorialCard from './TutorialCard';
import Loader from './Loader';

import '../styles/Tutorials.css';

class Tutorials extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Video: false,
			Blog: false,
			Free: false,
			Paid: false,
			Beginner: false,
			Intermediate: false,
			Advanced: false,
			filters: {
				medium: [],
				type: [],
				skillLevel: []
			}
		};

		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.props.getTag(this.props.match.params.tag);
		this.props.getTutorialsByTag(this.props.match.params.tag);
	}

	onChange(event) {
		let filters = this.state.filters;
		if (event.target.checked) {
			if (event.target.name === 'Video' || event.target.name === 'Blog') {
				filters.medium.push(event.target.name);
			} else if (event.target.name === 'Free' || event.target.name === 'Paid') {
				filters.type.push(event.target.name);
			} else if (
				event.target.name === 'Beginner' ||
				event.target.name === 'Intermediate' ||
				event.target.name === 'Advanced'
			) {
				filters.skillLevel.push(event.target.name);
			}
		} else {
			if (event.target.name === 'Video' || event.target.name === 'Blog') {
				filters.medium = filters.medium.filter(filter => filter !== event.target.name);
			} else if (event.target.name === 'Free' || event.target.name === 'Paid') {
				filters.type = filters.type.filter(filter => filter !== event.target.name);
			} else if (
				event.target.name === 'Beginner' ||
				event.target.name === 'Intermediate' ||
				event.target.name === 'Advanced'
			) {
				filters.skillLevel = filters.skillLevel.filter(filter => filter !== event.target.name);
			}
		}
		this.setState({
			[event.target.name]: event.target.checked,
			filters
		});
	}

	render() {
		let tutorials;
		if (this.props.tutorial.loading || !this.props.tutorial.tutorials) {
			tutorials = <Loader />;
		} else {
			const filteredTutorials = this.props.tutorial.tutorials.filter(tutorial => {
				if (
					this.state.filters.medium.length !== 0 &&
					this.state.filters.medium.includes(tutorial.medium) &&
					this.state.filters.type.length !== 0 &&
					this.state.filters.type.includes(tutorial.type) &&
					this.state.filters.skillLevel.length !== 0 &&
					this.state.filters.skillLevel.includes(tutorial.skillLevel)
				)
					return true;
				if (
					this.state.filters.medium.length === 0 &&
					this.state.filters.type.length !== 0 &&
					this.state.filters.type.includes(tutorial.type) &&
					this.state.filters.skillLevel.length !== 0 &&
					this.state.filters.skillLevel.includes(tutorial.skillLevel)
				)
					return true;
				if (
					this.state.filters.type.length === 0 &&
					this.state.filters.medium.length !== 0 &&
					this.state.filters.medium.includes(tutorial.medium) &&
					this.state.filters.skillLevel.length !== 0 &&
					this.state.filters.skillLevel.includes(tutorial.skillLevel)
				)
					return true;
				if (
					this.state.filters.skillLevel.length === 0 &&
					this.state.filters.medium.length !== 0 &&
					this.state.filters.medium.includes(tutorial.medium) &&
					this.state.filters.type.length !== 0 &&
					this.state.filters.type.includes(tutorial.type)
				)
					return true;
				if (
					this.state.filters.medium.length === 0 &&
					this.state.filters.type.length === 0 &&
					this.state.filters.skillLevel.length !== 0 &&
					this.state.filters.skillLevel.includes(tutorial.skillLevel)
				)
					return true;
				if (
					this.state.filters.skillLevel.length === 0 &&
					this.state.filters.type.length === 0 &&
					this.state.filters.medium.length !== 0 &&
					this.state.filters.medium.includes(tutorial.medium)
				)
					return true;
				if (
					this.state.filters.skillLevel.length === 0 &&
					this.state.filters.medium.length === 0 &&
					this.state.filters.type.length !== 0 &&
					this.state.filters.type.includes(tutorial.type)
				)
					return true;
				if (
					this.state.filters.skillLevel.length === 0 &&
					this.state.filters.medium.length === 0 &&
					this.state.filters.type.length === 0
				)
					return true;
				return false;
			});

			if (filteredTutorials.length === 0) {
				tutorials = (
					<div className="nothing-to-show nothing-matched">
						No Tutorials Found with the following filters
					</div>
				);
			} else {
				tutorials = filteredTutorials.map((tutorial, i) => (
					<Col span={24} key={i}>
						<TutorialCard tutorial={tutorial} />
					</Col>
				));
			}
		}
		return (
			<div className="tutorials-by-tag">
				<h1 className="tutorial-title">{this.props.tag.tag.tag} Tutorials</h1>
				<div className="filters">
					<div className="bold">Filters</div>
					<div className="filter">
						<Row gutter={8}>
							<Col xs={24} sm={4} md={3} lg={3} className="filter-type">
								Medium :{' '}
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox checked={this.state.Video} name="Video" onChange={this.onChange}>
									Video
								</Checkbox>
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox checked={this.state.Blog} name="Blog" onChange={this.onChange}>
									Blog
								</Checkbox>
							</Col>
						</Row>
					</div>
					<div className="filter">
						<Row gutter={8}>
							<Col xs={24} sm={4} md={3} lg={3} className="filter-type">
								Type :{' '}
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox checked={this.state.Free} name="Free" onChange={this.onChange}>
									Free
								</Checkbox>
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox checked={this.state.Paid} name="Paid" onChange={this.onChange}>
									Paid
								</Checkbox>
							</Col>
						</Row>
					</div>
					<div className="filter">
						<Row gutter={8}>
							<Col xs={24} sm={4} md={3} lg={3} className="filter-type">
								Skill Level :{' '}
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox
									checked={this.state.Beginner}
									name="Beginner"
									onChange={this.onChange}
								>
									Beginner
								</Checkbox>
							</Col>
							<Col xs={24} sm={7} md={5} lg={4}>
								<Checkbox
									checked={this.state.Intermediate}
									name="Intermediate"
									onChange={this.onChange}
								>
									Intermediate
								</Checkbox>
							</Col>
							<Col xs={24} sm={6} md={5} lg={4}>
								<Checkbox
									checked={this.state.Advanced}
									name="Advanced"
									onChange={this.onChange}
								>
									Advanced
								</Checkbox>
							</Col>
						</Row>
					</div>
				</div>
				<Row gutter={8}>{tutorials}</Row>
			</div>
		);
	}
}

Tutorials.propTypes = {
	tag: PropTypes.object.isRequired,
	tutorial: PropTypes.object.isRequired,
	getTag: PropTypes.func.isRequired,
	getTutorialsByTag: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tag: state.tag,
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getTag, getTutorialsByTag }
)(Tutorials);
