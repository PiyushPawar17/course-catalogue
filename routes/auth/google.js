const router = require('express').Router();
const passport = require('passport');

// Routes for /auth/google

// Type		GET
// URL		/auth/google
// Desc		Authenticates user with Google
router.get(
	'/',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

// Type		GET
// URL		/auth/google/redirect
// Desc		Callback route for Google to redirect
router.get('/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect('/profile');
});

// Type		GET
// URL		/auth/google/logout
// Desc		Logs out the user
router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
