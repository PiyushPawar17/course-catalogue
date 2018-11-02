const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { secretOrKey, emailVerificationKey } = require('../../config/keys');

const quickemailverification = require('quickemailverification')
	.client(emailVerificationKey)
	.quickemailverification();

const User = require('../../models/User');

// Routes for /api/users

// Type		GET
// URL		/api/users/me
// Desc		Return current user
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Array of fields to populate while returning the user
	const tutorialFields = [
		'title',
		'link',
		'description',
		'tags',
		'medium',
		'educator',
		'type',
		'skillLevel',
		'submittedBy',
		'submittedOn',
		'upvotes',
		'reviews'
	];

	// 1 - Find the user by ID from request's user object
	// 2 - Populate the 'submittedTutorials' and 'favorites' arrays of the user with the above fields
	// 3 - Return the user object in response
	User.findById(req.user._id)
		.populate('submittedTutorials', tutorialFields)
		.populate('favorites', tutorialFields)
		.then(user => {
			const currentUser = {
				_id: user._id,
				name: user.name,
				email: user.email,
				submittedTutorials: user.submittedTutorials,
				favorites: user.favorites,
				upvotes: user.upvotes
			};
			res.json({ user: currentUser });
		})
		.catch(err => res.status(500).json({ error: 'Unable to get profile', errorMsg: err }));
});

// Type		POST
// URL		/api/users/login
// Desc		Login user / Return token
router.post('/login', (req, res) => {
	// Destructure the email and password from request body
	const { email, password } = req.body;

	// 1 - Find the user by comparing email with emails in all documents in the collection
	// 2 - Return 404 if user not found
	// 3 - Compare the password with the hashed password using bcrypt
	// 4 - Return the Bearer token created using JWT in response
	User.findOne({ email }).then(user => {
		if (!user) return res.status(404).json({ error: 'User not found' });
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// Create a payload that will be included in the JWT token
				const payload = {
					id: user.id,
					name: user.name,
					email: user.email
				};
				// Expires in 12 hours
				jwt.sign(payload, secretOrKey, { expiresIn: 12 * 60 * 60 }, (err, token) => {
					res.json({ success: true, token: `Bearer ${token}` });
				});
			} else {
				return res.status(400).json({ error: 'Password incorrect' });
			}
		});
	});
});

// Type		POST
// URL		/api/users/register
// Desc		Creates a new user
router.post('/register', (req, res) => {
	// 1 - Find the user by comparing email with emails in all documents in the collection
	// 2 - If user already exist, don't create a new user
	// 3 - Verify if the given email exist
	// 4 - Create a new user
	// 5 - Save the created user
	// 6 - Return the created user in response
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ error: 'Email already exist' });
		} else {
			quickemailverification.verify(req.body.email, function(err, response) {
				if (response.body.result === 'valid') {
					const newUser = new User({
						name: req.body.name,
						email: req.body.email,
						password: req.body.password
					});

					newUser
						.save()
						.then(user => {
							const newUser = {
								submittedTutorials: user.submittedTutorials,
								favorites: user.favorites,
								upvotes: user.upvotes,
								_id: user._id,
								name: user.name,
								email: user.email
							};
							res.json({ user: 'New User Registered', newUser });
						})
						.catch(err => res.json({ error: 'Unable to register', errorMsg: err }));
				} else {
					return res.status(400).json({ msg: 'Enter a valid Email' });
				}
			});
		}
	});
});

module.exports = router;
