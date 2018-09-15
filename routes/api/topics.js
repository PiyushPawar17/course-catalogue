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
		description: req.body.description,
		website: req.body.website
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

module.exports = router;
