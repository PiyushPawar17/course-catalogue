const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'topic'
		}
	],
	medium: {
		type: String,
		required: true
	},
	educator: {
		type: String
	},
	submittedBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	submittedOn: {
		type: Date,
		default: Date.now
	},
	ratings: [
		{
			rating: {
				type: Number
			},
			ratedBy: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	],
	typeOfCourse: {
		type: String,
		required: true
	},
	skillLevel: {
		type: String,
		required: true
	},
	reviews: [
		{
			review: {
				type: String
			},
			reviewedBy: {
				type: Schema.Types.ObjectId,
				ref: 'user'
			}
		}
	]
});

const Tutorial = mongoose.model('tutorial', TutorialSchema);

module.exports = Tutorial;
