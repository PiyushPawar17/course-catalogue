const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	googleId: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	submittedVideoLinks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tutorial'
		}
	],
	submittedBlogLinks: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tutorial'
		}
	],
	favorites: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tutorial'
		}
	]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
