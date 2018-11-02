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
	// 1 - Find all tutorials from the database
	// 2 - Sort them in ascending order
	// 3 - Return the array of tutorials in response
	Tutorial.find({})
		.sort({ title: 1 })
		.then(tutorials => res.json({ tutorials }))
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/tag/:tag
// Desc		Returns list of tutorials of the given tag
router.get('/tag/:tag', (req, res) => {
	// Split the request param by '-' and join by ' '. ex machine-learning -> machine learning
	const tag = `^${req.params.tag.split('-').join(' ')}$`;
	// 1 - Find the tutorial with given tag from the database (regex is used to find tag ingoring case)
	// 2 - Return the tutorials array in response
	Tutorial.find({ tags: { $regex: tag, $options: 'i' } })
		.sort({ title: 1 })
		.then(tutorials => {
			if (tutorials.length === 0) return res.json({ tutorials, error: 'No tutorials found' });
			else res.json({ tutorials });
		})
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/:tutorial
// Desc		Returns the tutorial of the given ID
router.get('/:tutorial', (req, res) => {
	// 1 - Find tutorial by given ID
	// 2 - Populate it with user's name who submitted and users who reviewed
	// 3 - Return the populated tutorial object in response
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
	// 1 - Find the tutorials comparing 'submittedBy' field with authenticated user
	// 2 - Sort them alphabetically
	// 3 - Return the array of tutorials in response
	Tutorial.find({ submittedBy: req.user._id })
		.sort({ title: 1 })
		.then(tutorials => res.json({ tutorials }))
		.catch(err => res.status(500).json({ error: 'Unable to get tutorials', errorMsg: err }));
});

// Type		GET
// URL		/api/tutorials/me/favorites
// Desc		Returns list of favorite tutorials of the user
router.get('/me/favorites', passport.authenticate('jwt', { session: false }), (req, res) => {
	// 1 - Find the authenticated user
	// 2 - Return the favorites array of the user in response
	User.findById(req.user._id)
		.then(user => res.json({ favorites: user.favorites }))
		.catch(err => res.status(500).json({ error: 'Unable to get favorites', errorMsg: err }));
});

// Type		POST
// URL		/api/tutorials
// Desc		Adds a new tutorial to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Destructre the fields from request body
	const { title, educator, link, medium, type, skillLevel, tags, description } = req.body;
	// Create a new tutorial with the given fields
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

	// 1 - Save the tutorial
	// 2 - Find the authenticated user and update the array of submitted tutorials of the user by adding ID of saved tutorial
	// 3 - Return the saved tutorial in response
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
	// Create an object that contains review from request body and user ID of authenticated user
	const newReview = {
		review: req.body.review,
		reviewedBy: req.user._id
	};

	// 1 - Find the tutorial by the ID included in request params
	// 2 - Add the above review object in reviews array of the tutorial
	// 3 - Return the updated tutorial in response
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
	// Reject if invalid ObjectID
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });
	// 1 - Find the authenticated
	// 2 - Add the ID of the tutorial from request params to favorites array of the user
	// 3 - Return success message in response
	User.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: req.params.tutorial } }, { new: true })
		.then(user => res.json({ msg: 'Tutorial added to favorites' }))
		.catch(err => res.status(500).json({ error: 'Unable to add to favorites', errorMsg: err }));
});

// Type		POST
// URL		/api/tutorials/upvote/add/:tutorial
// Desc		Adds Upvote to the tutorial
router.post('/upvote/add/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Reject if invalid ObjectID
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	// 1 - Find the tutorial by ID given in request params
	// 2 - Add ID of authenticated user to the array of upvotes of the tutorial
	// 3 - Find the user and add the ID of tutorial to upvotes array of the user
	// 4 - Return success message in response
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

// Type		DELETE
// URL		/api/tutorials/me/removefavorite/:tutorial
// Desc		Removes tutorial from user's favorites
router.delete(
	'/me/removefavorite/:tutorial',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		// Reject if invalid ObjectID
		if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
			return res.status(400).json({ error: 'Invalid ObjectId' });

		// 1 - Find the user and remove the ID of the given tutorial in request params from array of user's favorites
		// 2 - Return success message in response
		User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { favorites: mongoose.Types.ObjectId(req.params.tutorial) } },
			{ multi: true }
		)
			.then(user => res.json({ msg: 'Tutorial removed from favorites' }))
			.catch(err => res.status(500).json({ error: 'Unable to remove from favorites', errorMsg: err }));
	}
);

// Type		DELETE
// URL		/api/tutorials/upvote/remove/:tutorial
// Desc		Removes Upvote from the tutorial
router.delete('/upvote/remove/:tutorial', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Reject if invalid ObjectID
	if (!mongoose.Types.ObjectId.isValid(req.params.tutorial))
		return res.status(400).json({ error: 'Invalid ObjectId' });

	// 1 - Find the tutorial and remove user's ID from the upvotes array of the tutorial
	// 2 - Find the user and remove tutorial's ID from the upvotes array of the user
	// 3 - Return success message in response
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
