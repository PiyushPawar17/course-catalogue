const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	description: {
		type: String,
		trim: true,
		default: ''
	},
	website: {
		type: String,
		trim: true,
		default: ''
	}
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;
