const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	}
});

const Topic = mongoose.model('topic', TopicSchema);

module.exports = Topic;
