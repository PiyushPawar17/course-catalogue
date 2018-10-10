const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { secretOrKey } = require('../../config/keys');

const User = require('../../models/User');

// Routes for /api/users

// Type		GET
// URL		/api/users/me
// Desc		Return current user
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user._id)
		.populate('submittedTutorials', [
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
		])
		.then(user => res.json({ user }))
		.catch(err => console.log(err));
});

// Type		POST
// URL		/api/users/login
// Desc		Login user / Return token
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }).then(user => {
		if (!user) return res.status(404).json({ error: 'User not found' });
		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
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
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ error: 'Email already exist' });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json({ user: 'New User Registered' }))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

module.exports = router;
