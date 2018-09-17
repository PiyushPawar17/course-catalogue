const router = require('express').Router();
const passport = require('passport');

const Tutorial = require('../../models/Tutorial');

// Routes for /api/tutorials

// Type		POST
// URL		/api/tutorials
// Desc		Adds a new tutorial to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { title, educator, link, medium, type, skillLevel, tags } = req.body;
	const tutorial = new Tutorial({
		title,
		educator,
		link,
		medium,
		type,
		skillLevel,
		tags,
		submittedBy: req.user._id
	});

	tutorial
		.save()
		.then(tutorial => {
			res.json({ tutorial });
		})
		.catch(err => console.log(err));
});

module.exports = router;
