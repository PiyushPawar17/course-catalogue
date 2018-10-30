const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	submittedTutorials: [
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
	],
	upvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tutorial'
		}
	]
});

UserSchema.pre('save', function(next) {
	let user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) throw err;
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
