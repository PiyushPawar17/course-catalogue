import React from 'react';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';
import { connect } from 'react-redux';
import { addTag } from '../actions/tagActions';
import { addTutorial } from '../actions/tutorialActions';

import '../styles/TutorialForm.css';

class TutorialForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			tags: []
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitTutorial = this.submitTutorial.bind(this);
		this.addTag = this.addTag.bind(this);
		this.selectTags = this.selectTags.bind(this);
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

	addTag(event) {
		event.preventDefault();

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

		const tutorial = {
			title: this.refs.tutorialTitle.input.value,
			educator: this.refs.educatorsName.input.value,
			link: this.refs.tutorialLink.input.value,
			medium: this.refs.tutorialMedium.state.value,
			type: this.refs.tutorialType.state.value,
			skillLevel: this.refs.skillLevel.state.value,
			tags: this.state.tags
		};

		this.props.addTutorial(tutorial, this.props.history);
	}

	render() {
		return (
			<Form className="full-page-form" onSubmit={this.submitTutorial}>
				<h1 className="full-page-form-title">Tutorial Details</h1>
				<Form.Item>
					<div className="form-label">Tutorial Title</div>
					<Input type="text" placeholder="Tutorial Title" ref="tutorialTitle" />
				</Form.Item>
				<Form.Item>
					<div className="form-label">Educator's Name</div>
					<Input type="text" placeholder="Educator's Name" ref="educatorsName" />
				</Form.Item>
				<Form.Item>
					<div className="form-label">Link to Original Tutorial</div>
					<Input type="text" placeholder="Link" ref="tutorialLink" />
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
					<div className="form-label">Tags</div>
					<Select mode="multiple" onChange={this.selectTags}>
						<Select.Option key="React">React</Select.Option>
						<Select.Option key="Redux">Redux</Select.Option>
						<Select.Option key="Node">Node</Select.Option>
						<Select.Option key="Express">Express</Select.Option>
						<Select.Option key="MongoDB">MongoDB</Select.Option>
					</Select>
					<Button onClick={this.openModal}>Add New Tag</Button>
				</Form.Item>
				<Form.Item className="form-action-buttons">
					<Button type="primary" htmlType="submit" className="form-action-button">
						Submit Tutorial
					</Button>
					<Button className="form-action-button">Cancel</Button>
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
							<div className="form-label">Tag</div>
							<Input type="text" placeholder="Tag" ref="newTag" />
						</Form.Item>
						<Form.Item>
							<div className="form-label">Description</div>
							<Input.TextArea placeholder="Description" rows={3} ref="tagDescription" />
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

const mapStateToProps = state => ({
	tag: state.tag,
	tutorial: state.tutorial
});

export default connect(
	mapStateToProps,
	{ addTag, addTutorial }
)(TutorialForm);
