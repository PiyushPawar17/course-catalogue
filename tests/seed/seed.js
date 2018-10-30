const User = require('../../models/User');
const Tutorial = require('../../models/Tutorial');
const Tag = require('../../models/Tag');

let { users, tutorials, tags } = require('./seed_data');

const populateUsers = done => {
	let userOne = new User(users[0]).save();
	let userTwo = new User(users[1]).save();
	Promise.all([userOne, userTwo]).then(() => done());
};

const removeUsers = done => {
	User.remove({}).then(() => done());
};

const populateTutorials = done => {
	Tutorial.insertMany(tutorials).then(() => done());
};

const removeTutorials = done => {
	Tutorial.remove({}).then(() => done());
};

const populateTags = done => {
	Tag.insertMany(tags).then(() => done());
};

const removeTags = done => {
	Tag.remove({}).then(() => done());
};

module.exports = {
	populateUsers,
	populateTutorials,
	populateTags,
	removeUsers,
	removeTutorials,
	removeTags
};
