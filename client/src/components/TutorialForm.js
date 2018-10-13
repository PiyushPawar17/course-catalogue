import React from 'react';
import { Form, Input, Button, Radio, Select, Modal, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addTag, getTags } from '../actions/tagActions';
import { addTutorial } from '../actions/tutorialActions';

import '../styles/TutorialForm.css';

class TutorialForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			tags: [],
			tutorialLetters: 0,
			tagLetters: 0,
			tutorialDescription: '',
			tagDescription: ''
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitTutorial = this.submitTutorial.bind(this);
		this.addTag = this.addTag.bind(this);
		this.selectTags = this.selectTags.bind(this);
		this.onChangeTutorial = this.onChangeTutorial.bind(this);
		this.onChangeTag = this.onChangeTag.bind(this);
	}

	componentDidMount() {
		this.props.getTags();
	}

	openModal() {
		this.setState({ modalVisible: true });
	}

	closeModal() {
		this.setState({ modalVisible: false });
	}

	selectTags(tags) {
		this.setState({ tags });
	}

	onChangeTutorial() {
		const tutorialDescription = this.refs.tutorialDescription.textAreaRef.value;
		if (tutorialDescription.length <= 150) {
			this.setState({ tutorialLetters: tutorialDescription.length, tutorialDescription });
		}
	}

	onChangeTag() {
		const tagDescription = this.refs.tagDescription.textAreaRef.value;
		if (tagDescription.length <= 150) {
			this.setState({ tagLetters: tagDescription.length, tagDescription });
		}
	}

	addTag(event) {
		event.preventDefault();

		if (this.refs.newTag.input.value.trim() === '') {
			return message.warning('Enter Tag');
		}
		if (this.refs.tagDescription.textAreaRef.value.trim() === '') {
			return message.warning('Enter Tag Description');
		}

		const tag = {
			tag: this.refs.newTag.input.value,
			description: this.refs.tagDescription.textAreaRef.value,
			website: this.refs.tagWebsite.input.value
		};

		this.props.addTag(tag);

		this.refs.newTag.input.value = '';
		this.refs.tagDescription.textAreaRef.value = '';
		this.refs.tagWebsite.input.value = '';

		this.closeModal();
		window.location.reload();
	}

	submitTutorial(event) {
		event.preventDefault();
		if (this.refs.tutorialTitle.input.value.trim() === '') {
			return message.warning('Enter Title');
		}
		if (this.refs.educatorsName.input.value.trim() === '') {
			return message.warning('Enter Educator Name');
		}
		if (this.refs.tutorialLink.input.value.trim() === '') {
			return message.warning('Provide Tutorial Link');
		}
		if (this.refs.tutorialDescription.textAreaRef.value.trim() === '') {
			return message.warning('Enter Tutorial Description');
		}
		if (this.state.tags.length === 0) {
			return message.warning('Select Tags');
		}

		const tutorial = {
			title: this.refs.tutorialTitle.input.value,
			educator: this.refs.educatorsName.input.value,
			link: this.refs.tutorialLink.input.value,
			description: this.refs.tutorialDescription.textAreaRef.value,
			medium: this.refs.tutorialMedium.state.value,
			type: this.refs.tutorialType.state.value,
			skillLevel: this.refs.skillLevel.state.value,
			tags: this.state.tags
		};

		this.props.addTutorial(tutorial, this.props.history);
	}

	render() {
		let tags;
		if (this.props.tag.loading || !this.props.tag.tags) {
			tags = null;
		} else {
			tags = this.props.tag.tags.map(tag => (
				<Select.Option key={tag.tag} value={tag.tag}>
					{tag.tag}
				</Select.Option>
			));
		}

		return (
			<Form className="full-page-form" onSubmit={this.submitTutorial}>
				<h1 className="full-page-form-title">Tutorial Details</h1>
				<Form.Item>
					<div className="form-label required">Tutorial Title</div>
					<Input type="text" placeholder="Tutorial Title" ref="tutorialTitle" />
				</Form.Item>
				<Form.Item>
					<div className="form-label required">Educator's Name</div>
					<Input type="text" placeholder="Educator's Name" ref="educatorsName" />
				</Form.Item>
				<Form.Item>
					<div className="form-label required">Link to Original Tutorial</div>
					<Input type="text" placeholder="Link" ref="tutorialLink" />
				</Form.Item>
				<Form.Item>
					<div className="form-label required">Description</div>
					<Input.TextArea
						placeholder="Description"
						rows={2}
						ref="tutorialDescription"
						onChange={this.onChangeTutorial}
						value={this.state.tutorialDescription}
					/>
					<small className="word-count">{this.state.tutorialLetters} / 150</small>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Medium</div>
					<Radio.Group defaultValue="Video" ref="tutorialMedium">
						<Radio.Button value="Video">Video</Radio.Button>
						<Radio.Button value="Blog">Blog</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Type of Tutorial</div>
					<Radio.Group defaultValue="Free" ref="tutorialType">
						<Radio.Button value="Free">Free</Radio.Button>
						<Radio.Button value="Paid">Paid</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Skill Level</div>
					<Radio.Group defaultValue="Beginner" ref="skillLevel">
						<Radio.Button value="Beginner">Beginner</Radio.Button>
						<Radio.Button value="Intermediate">Intermediate</Radio.Button>
						<Radio.Button value="Advanced">Advanced</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label required">Tags</div>
					<Select mode="multiple" onChange={this.selectTags}>
						{tags}
					</Select>
					<Button onClick={this.openModal}>Add New Tag</Button>
				</Form.Item>
				<Form.Item className="form-action-buttons">
					<Button type="primary" htmlType="submit" className="form-action-button">
						Submit Tutorial
					</Button>
					<Button className="form-action-button" onClick={this.props.history.goBack}>
						Cancel
					</Button>
				</Form.Item>
				<Modal
					visible={this.state.modalVisible}
					title="New Tag Details"
					onCancel={this.closeModal}
					footer={[
						<Button key="1" onClick={this.closeModal}>
							Cancel
						</Button>,
						<Button key="2" type="primary" onClick={this.addTag}>
							Add Tag
						</Button>
					]}
				>
					<Form>
						<Form.Item>
							<div className="form-label required">Tag</div>
							<Input type="text" placeholder="Tag" ref="newTag" />
						</Form.Item>
						<Form.Item>
							<div className="form-label required">Description</div>
							<Input.TextArea
								placeholder="Description"
								rows={3}
								ref="tagDescription"
								onChange={this.onChangeTag}
								value={this.state.tagDescription}
							/>
							<small className="word-count">{this.state.tagLetters} / 150</small>
						</Form.Item>
						<Form.Item>
							<div className="form-label">Official Website</div>
							<Input type="text" placeholder="Official Website" ref="tagWebsite" />
						</Form.Item>
					</Form>
				</Modal>
			</Form>
		);
	}
}

TutorialForm.propTypes = {
	tag: PropTypes.object.isRequired,
	tutorial: PropTypes.object.isRequired,
	getTags: PropTypes.func.isRequired,
	addTag: PropTypes.func.isRequired,
	addTutorial: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	tag: state.tag,
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ getTags, addTag, addTutorial }
)(TutorialForm);
