const router = require('express').Router();

const Topic = require('../../models/Topic');

// Routes for /api/topics

// Type		GET
// URL		/api/topics
// Desc		Returns list of all topics
router.get('/', (req, res) => {
	Topic.find({})
		.then(topics => {
			res.json({ topics });
		})
		.catch(err => {
			res.json({ err: 'Unable to get topics' });
		});
});

// Type		POST
// URL		/api/topics
// Desc		Adds a new topic to the database
router.post('/', (req, res) => {
	const topic = new Topic({
		name: req.body.name
	});

	topic
		.save()
		.then(topic => {
			res.json({ topic });
		})
		.catch(err => {
			if (err.code === 11000) res.json({ err: 'Topic already exist' });
			else res.json({ err });
		});
});

// Type		DELETE
// URL		/api/topics/:topic
// Desc		Removes the topic from the database
router.delete('/:topic', (req, res) => {
	Topic.findOneAndRemove({ name: req.params.topic })
		.then(topic => {
			res.json({ topic });
		})
		.catch(err => {
			res.json({ err });
		});
});

module.exports = router;
