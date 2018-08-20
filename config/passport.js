const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			// Options for Google Strategy
			callbackURL: '/auth/google/redirect',
			clientID: google.clientID,
			clientSecret: google.clientSecret
		},
		(accessToken, refreshToken, profile, done) => {
			// Passport callback function
			User.findOne({ googleId: profile.id }).then(currentUser => {
				if (currentUser) {
					done(null, currentUser);
				} else {
					const user = new User({
						name: profile.displayName,
						googleId: profile.id,
						email: profile.emails[0].value
					});

					user.save()
						.then(user => {
							done(null, user);
						})
						.catch(err => console.log(err));
				}
			});
		}
	)
);
