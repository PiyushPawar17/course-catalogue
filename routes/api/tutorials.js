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
		.populate('reviews.reviewedBy', 'name')
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

// Type		GET
// URL		/api/tutorials/me/favorites
// Desc		Returns list of favorite tutorials of the user
router.get('/me/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.then(user => res.json({ favorites: user.favorites }))
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
			User.findByIdAndUpdate(
				req.user._id,
				{ $push: { submittedTutorials: tutorial._id } },
				{ new: true }
			)
				.then(user => res.json({ tutorial }))
				.catch(err => console.log(err));
		})
		.catch(err => console.log(err));
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
		.then(tutorial => res.json({ tutorial }))
		.catch(err => console.log(err));
});

// Type		POST
// URL		/api/tutorials/me/addfavorite/:tutorial
// Desc		Adds tutorial to user's favorites
router.post('/me/addfavorite/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newFavorite = mongoose.Types.ObjectId(req.params.tutorial);

	User.findById(req.user._id)
		.then(user => {
			let filteredFavorites = user.favorites.filter(favorite => favorite.equals(newFavorite));
			if (filteredFavorites.length >= 1) {
				return res.json({ msg: 'Tutorial already added to favorites' });
			} else {
				const favorites = [...user.favorites, newFavorite];
				User.findByIdAndUpdate(req.user._id, { $set: { favorites } }, { new: true })
					.then(user => res.json({ msg: 'Tutorial added to favorites' }))
					.catch(err => console.log(err));
			}
		})
		.catch(err => console.log(err));
});

// Type		POST
// URL		/api/tutorials/me/removefavorite/:tutorial
// Desc		Removes tutorial from user's favorites
router.post('/me/removefavorite/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findByIdAndUpdate(
		req.user._id,
		{ $pull: { favorites: mongoose.Types.ObjectId(req.params.tutorial) } },
		{ multi: true }
	)
		.then(user => res.json({ msg: 'Tutorial removed from favorites' }))
		.catch(err => console.log(err));
});

module.exports = router;
