const router = require('express').Router();
const passport = require('passport');

const Tag = require('../../models/Tag');

// Routes for /api/tags

// Type		GET
// URL		/api/tags
// Desc		Returns list of all tags
router.get('/', (req, res) => {
	Tag.find({})
		.sort({ tag: 1 })
		.then(tags => {
			res.json({ tags });
		})
		.catch(err => {
			res.status(500).json({ error: 'Unable to get tags', errorMsg: err });
		});
});

// Type		GET
// URL		/api/tags/:tag
// Desc		Returns information of given tag
router.get('/:tag', (req, res) => {
	const tag = req.params.tag.split('-').join(' ');
	Tag.findOne({ tag: { $regex: tag, $options: 'i' } })
		.then(tag => {
			if (tag) res.json({ tag });
			else res.status(404).json({ error: 'Tag not found' });
		})
		.catch(err => {
			res.json({ error: 'Unable to get the specified tag', errorMsg: err });
		});
});

// Type		POST
// URL		/api/tags
// Desc		Adds a new tag to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const tag = new Tag({
		tag: req.body.tag,
		description: req.body.description,
		website: req.body.website
	});

	tag.save()
		.then(tag => {
			res.json({ tag });
		})
		.catch(err => {
			if (err.code === 11000) res.status(401).json({ error: 'Tag already exist' });
			else res.json({ err });
		});
});

module.exports = router;
