import React from 'react';
import { Form, Input, Button, Radio, Select, Modal } from 'antd';

import '../styles/TutorialForm.css';

class TutorialForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false
		};

		this.addTag = this.addTag.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	addTag() {
		this.setState({ modalVisible: true });
	}

	closeModal() {
		this.setState({ modalVisible: false });
	}

	render() {
		return (
			<Form className="full-page-form">
				<h1 className="full-page-form-title">Tutorial Details</h1>
				<Form.Item>
					<div className="form-label">Tutorial Title</div>
					<Input type="text" placeholder="Tutorial Title" />
				</Form.Item>
				<Form.Item>
					<div className="form-label">Educator's Name</div>
					<Input type="text" placeholder="Educator's Name" />
				</Form.Item>
				<Form.Item>
					<div className="form-label">Link to Original Tutorial</div>
					<Input type="text" placeholder="Link" />
				</Form.Item>
				<Form.Item>
					<div className="form-label">Medium</div>
					<Radio.Group defaultValue="Video">
						<Radio.Button value="Video">Video</Radio.Button>
						<Radio.Button value="Blog">Blog</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Type of Course</div>
					<Radio.Group defaultValue="Free">
						<Radio.Button value="Free">Free</Radio.Button>
						<Radio.Button value="Paid">Paid</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Skill Level</div>
					<Radio.Group defaultValue="Beginner">
						<Radio.Button value="Beginner">Beginner</Radio.Button>
						<Radio.Button value="Intermediate">Intermediate</Radio.Button>
						<Radio.Button value="Advanced">Advanced</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<div className="form-label">Tags</div>
					<Select mode="multiple">
						<Select.Option key="React">React</Select.Option>
						<Select.Option key="Redux">Redux</Select.Option>
						<Select.Option key="Node">Node</Select.Option>
						<Select.Option key="Express">Express</Select.Option>
						<Select.Option key="MongoDB">MongoDB</Select.Option>
					</Select>
					<Button onClick={this.addTag}>Add New Tag</Button>
				</Form.Item>
				<Form.Item className="form-action-buttons">
					<Button type="primary" className="form-action-button">
						Submit Tutorial
					</Button>
					<Button className="form-action-button">Cancel</Button>
				</Form.Item>
				<Modal
					visible={this.state.modalVisible}
					title="New Tag Details"
					onCancel={this.closeModal}
					footer={[
						<Button onClick={this.closeModal}>Cancel</Button>,
						<Button type="primary" onClick={this.closeModal}>
							Add Tag
						</Button>
					]}
				>
					<Form>
						<Form.Item>
							<div className="form-label">Tag</div>
							<Input type="text" placeholder="Tag" />
						</Form.Item>
						<Form.Item>
							<div className="form-label">Description</div>
							<Input.TextArea placeholder="Description" rows={3} />
						</Form.Item>
						<Form.Item>
							<div className="form-label">Official Website</div>
							<Input type="text" placeholder="Official Website" />
						</Form.Item>
					</Form>
				</Modal>
			</Form>
		);
	}
}

export default TutorialForm;
