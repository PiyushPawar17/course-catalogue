const router = require('express').Router();
const passport = require('passport');

const Tutorial = require('../../models/Tutorial');

// Routes for /api/tutorials

// Type		GET
// URL		/api/tutorials/all
// Desc		Returns list of all uploaded tutorials
router.get('/all', (req, res) => {
	Tutorial.find({})
		.then(tutorials => res.json({ tutorials }))
		.catch(err => console.log(err));
});

// Type		GET
// URL		/api/tutorials/tag/:tag
// Desc		Returns list of tutorials of the given tag
router.get('/tag/:tag', (req, res) => {
	const tag = req.params.tag.split('-').join(' ');
	Tutorial.find({ tags: { $regex: tag, $options: 'i' } })
		.then(tutorials => {
			res.json({ tutorials });
		})
		.catch(err => console.log(err));
});

// Type		GET
// URL		/api/tutorials/:tutorial
// Desc		Returns the tutorial of the given ID
router.get('/:tutorial', (req, res) => {
	Tutorial.findById(req.params.tutorial)
		.populate('submittedBy', 'name')
		.then(tutorial => res.json({ tutorial }))
		.catch(err => console.log(err));
});

// Type		GET
// URL		/api/tutorials
// Desc		Returns list of uploaded tutorials by the user
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Tutorial.find({ submittedBy: req.user._id })
		.then(tutorials => res.json({ tutorials }))
		.catch(err => console.log(err));
});

// Type		POST
// URL		/api/tutorials
// Desc		Adds a new tutorial to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { title, educator, link, medium, type, skillLevel, tags, description } = req.body;
	const tutorial = new Tutorial({
		title,
		educator,
		link,
		description,
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
