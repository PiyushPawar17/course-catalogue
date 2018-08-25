const router = require('express').Router();
const passport = require('passport');

const Topic = require('../../models/Topic');

// Routes for /api/topics

// Type		GET
// URL		/api/topics
// Desc		Returns list of all topics
router.get('/', (req, res) => {
	Topic.find({})
		.populate('addedBy', ['name'])
		.then(topics => {
			res.json({ topics });
		})
		.catch(err => {
			res.json({ error: 'Unable to get topics' });
		});
});

// Type		POST
// URL		/api/topics
// Desc		Adds a new topic to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const topic = new Topic({
		name: req.body.name,
		addedBy: req.user._id
	});

	topic
		.save()
		.then(topic => {
			res.json({ topic });
		})
		.catch(err => {
			if (err.code === 11000) res.json({ error: 'Topic already exist' });
			else res.json({ err });
		});
});

// Type		DELETE
// URL		/api/topics/:topic
// Desc		Removes the topic from the database
router.delete('/:topic', passport.authenticate('jwt', { session: false }), (req, res) => {
	Topic.findOne({ name: req.params.topic })
		.then(topic => {
			if (topic.addedBy.toString() === req.user._id.toString()) {
				Topic.findOneAndRemove({ name: req.params.topic })
					.then(topic => {
						res.json({ deletedTopic: topic });
					})
					.catch(err => {
						res.json({ err });
					});
			} else {
				res.status(403).json({ msg: 'You cant remove this topic' });
			}
		})
		.catch(err => {
			res.json({ error: 'Unable to find topic' });
		});
});

module.exports = router;
