const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Tutorial = require('../../models/Tutorial');
const User = require('../../models/User');

// Routes for /api/tutorials

// Type		GET
// URL		/api/tutorials/all
// Desc		Returns list of all uploaded tutorials
router.get('/all', (req, res) => {
	Tutorial.find({})
		.sort({ title: 1 })
		.then(tutorials => res.json({ tutorials }))
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/tag/:tag
// Desc		Returns list of tutorials of the given tag
router.get('/tag/:tag', (req, res) => {
	const tag = `^${req.params.tag.split('-').join(' ')}$`;
	Tutorial.find({ tags: { $regex: tag, $options: 'i' } })
		.sort({ title: 1 })
		.then(tutorials => {
			if (tutorials.length === 0) return res.status(404).json({ error: 'No tutorials found' });
			else res.json({ tutorials });
		})
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/:tutorial
// Desc		Returns the tutorial of the given ID
router.get('/:tutorial', (req, res) => {
	Tutorial.findById(req.params.tutorial)
		.populate('submittedBy', 'name')
		.populate('reviews.reviewedBy', 'name')
		.then(tutorial => {
			if (tutorial) res.json({ tutorial });
			else res.status(404).json({ error: 'Tutorial not found' });
		})
		.catch(err => res.status(500).json({ error: 'Unable to get tutorial', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials
// Desc		Returns list of tutorials uploaded by the user
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Tutorial.find({ submittedBy: req.user._id })
		.sort({ title: 1 })
		.then(tutorials => res.json({ tutorials }))
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/me/favorites
// Desc		Returns list of favorite tutorials of the user
router.get('/me/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => res.json({ favorites: user.favorites }))
		.catch(err => res.status(500).json({ error: 'Unable to get favorites', errorMsg: err }));
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
			User.findByIdAndUpdate(
				req.user._id,
				{ $push: { submittedTutorials: tutorial._id } },
				{ new: true }
			)
				.then(user => res.json({ tutorial }))
				.catch(err => res.status(500).json({ error: 'Unable to update user data', errorMsg: err }));
		})
		.catch(err => res.status(500).json({ error: 'Unable to save tutorial', errorMsg: err }));
});

// Type		POST
// URL		/api/tutorials/review/:tutorial
// Desc		Adds a review to the tutorial
router.post('/review/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newReview = {
		review: req.body.review,
		reviewedBy: req.user._id
	};

	Tutorial.findByIdAndUpdate(req.params.tutorial, { $push: { reviews: newReview } }, { new: true })
		.then(tutorial => {
			if (!tutorial) return res.status(404).json({ error: 'Tutorial not found' });
			else res.json({ tutorial });
		})
		.catch(err => res.status(500).json({ error: 'Unable to post review', errorMsg: err }));
});

// Type		POST
// URL		/api/tutorials/me/addfavorite/:tutorial
// Desc		Adds tutorial to user's favorites
router.post('/me/addfavorite/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	User.findById(req.user._id)
		.then(user => {
			User.findByIdAndUpdate(
				req.user._id,
				{ $addToSet: { favorites: req.params.tutorial } },
				{ new: true }
			)
				.then(user => res.json({ msg: 'Tutorial added to favorites' }))
				.catch(err => res.status(500).json({ error: 'Unable to add to favorites', errorMsg: err }));
		})
		.catch(err => res.status(500).json({ error: 'Unable to find user' }));
});

// Type		POST
// URL		/api/tutorials/me/removefavorite/:tutorial
// Desc		Removes tutorial from user's favorites
router.post('/me/removefavorite/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	User.findByIdAndUpdate(
		req.user._id,
		{ $pull: { favorites: mongoose.Types.ObjectId(req.params.tutorial) } },
		{ multi: true }
	)
		.then(user => res.json({ msg: 'Tutorial removed from favorites' }))
		.catch(err => res.status(500).json({ error: 'Unable to remove from favorites', errorMsg: err }));
});

// Type		POST
// URL		/api/tutorials/upvote/add/:tutorial
// Desc		Adds Upvote to the tutorial
router.post('/upvote/add/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	Tutorial.findByIdAndUpdate(
		req.params.tutorial,
		{ $addToSet: { upvotes: req.user._id } },
		{ new: true }
	).then(tutorial => {
		User.findByIdAndUpdate(req.user._id, { $addToSet: { upvotes: tutorial._id } }, { new: true })
			.then(user => res.json({ msg: 'Upvote Added' }))
			.catch(err => res.status(500).json({ error: 'Unable to upvote', errorMsg: err }));
	});
});

// Type		POST
// URL		/api/tutorials/upvote/remove/:tutorial
// Desc		Removes Upvote from the tutorial
router.post('/upvote/remove/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	Tutorial.findByIdAndUpdate(
		req.params.tutorial,
		{ $pull: { upvotes: req.user._id } },
		{ multi: true }
	).then(tutorial => {
		User.findByIdAndUpdate(req.user._id, { $pull: { upvotes: tutorial._id } }, { multi: true })
			.then(user => res.json({ msg: 'Upvote Removed' }))
			.catch(err => res.status(500).json({ error: 'Unable to remove upvote', errorMsg: err }));
	});
});

module.exports = router;
