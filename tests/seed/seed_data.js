const mongoose = require('mongoose');

const userOneId = new mongoose.Types.ObjectId();
const userTwoId = new mongoose.Types.ObjectId();

const tutorialOneId = new mongoose.Types.ObjectId();
const tutorialTwoId = new mongoose.Types.ObjectId();
const tutorialThreeId = new mongoose.Types.ObjectId();

// User Data
const users = [
	{
		_id: userOneId,
		email: 'user1@example.com',
		password: 'userOnePassword',
		name: 'User1',
		submittedTutorials: [tutorialOneId, tutorialThreeId],
		favorites: [tutorialOneId],
		upvotes: [tutorialOneId, tutorialTwoId]
	},
	{
		_id: userTwoId,
		email: 'user2@example.com',
		password: 'userTwoPassword',
		name: 'User2',
		submittedTutorials: [tutorialTwoId],
		favorites: [tutorialOneId, tutorialTwoId],
		upvotes: [tutorialTwoId, tutorialThreeId]
	}
];

// Tutorial Data
const tutorials = [
	{
		_id: tutorialOneId,
		title: 'Modern React with Redux',
		educator: 'Stephen Grider',
		link: 'https://www.udemy.com/react-redux/',
		description: 'React with Redux',
		medium: 'Video',
		type: 'Paid',
		skillLevel: 'Beginner',
		tags: ['React'],
		submittedBy: users[0]._id,
		upvotes: [userOneId],
		reviews: [
			{
				review: 'Test',
				reviewedBy: userOneId
			},
			{
				review: 'Test',
				reviewedBy: userTwoId
			}
		]
	},
	{
		_id: tutorialTwoId,
		title: 'Advanced React and Redux: 2018 Edition',
		educator: 'Stephen Grider',
		link: 'https://www.udemy.com/react-redux-tutorial/',
		description: 'React and Redux',
		medium: 'Video',
		type: 'Paid',
		skillLevel: 'Intermediate',
		tags: ['React', 'Redux'],
		submittedBy: users[1]._id,
		upvotes: [userOneId, userTwoId],
		reviews: [
			{
				review: 'Test',
				reviewedBy: userOneId
			}
		]
	},
	{
		_id: tutorialThreeId,
		title: 'Four Ways To Style React Components',
		educator: 'Agata Krzywda',
		link: 'https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822',
		description: 'React Styling',
		medium: 'Blog',
		type: 'Free',
		skillLevel: 'Beginner',
		tags: ['React'],
		submittedBy: users[0]._id,
		upvotes: [userTwoId],
		reviews: [
			{
				review: 'Test',
				reviewedBy: userTwoId
			}
		]
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
