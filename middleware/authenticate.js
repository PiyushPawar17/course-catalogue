// Middleware to check whether the user is logged in

const authenticate = (req, res, next) => {
	if (!req.user) {
		// If user is not logged in
		res.redirect('/');
	} else {
		// If user is logged in
		next();
	}
};

module.exports = authenticate;
