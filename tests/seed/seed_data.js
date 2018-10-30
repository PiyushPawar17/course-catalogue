const mongoose = require('mongoose');

const { secretOrKey } = require('../../config/keys');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

// User Data
const users = [
	{
		_id: userOneId,
		email: 'piyushpawar25@gmail.com',
		password: 'userOnePassword',
		name: 'User1'
	},
	{
		_id: userTwoId,
		email: 'piyushpawar17@hotmail.com',
		password: 'userTwoPassword',
		name: 'User2'
	}
];

// Tutorial Data
const tutorials = [
	{
		title: 'Modern React with Redux',
		educator: 'Stephen Grider',
		link: 'https://www.udemy.com/react-redux/',
		description: 'React with Redux',
		medium: 'Video',
		type: 'Paid',
		skillLevel: 'Beginner',
		tags: ['React'],
		submittedBy: users[0]._id
	},
	{
		title: 'Advanced React and Redux: 2018 Edition',
		educator: 'Stephen Grider',
		link: 'https://www.udemy.com/react-redux-tutorial/',
		description: 'React and Redux',
		medium: 'Video',
		type: 'Paid',
		skillLevel: 'Intermediate',
		tags: ['React', 'Redux'],
		submittedBy: users[1]._id
	},
	{
		title: 'Four Ways To Style React Components',
		educator: 'Agata Krzywda',
		link: 'https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822',
		description: 'React Styling',
		medium: 'Blog',
		type: 'Free',
		skillLevel: 'Beginner',
		tags: ['React'],
		submittedBy: users[0]._id
	}
];

// Tags Data
const tags = [
	{
		_id: new mongoose.Types.ObjectId(),
		tag: 'Express',
		description: 'Nodejs Framework',
		website: 'https://expressjs.com/'
	},
	{
		_id: new mongoose.Types.ObjectId(),
		tag: 'React',
		description: 'Front End Framework',
		website: 'https://reactjs.org'
	},
	{
		_id: new mongoose.Types.ObjectId(),
		tag: 'Redux',
		description: 'State Management'
	}
];

module.exports = { users, tutorials, tags };
