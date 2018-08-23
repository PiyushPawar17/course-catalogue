const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');

const passportSetup = require('./config/passport');
const mongoose = require('./db/mongoose');
const { cookieKey } = require('./config/keys');
const authenticate = require('./middleware/authenticate');

const google = require('./routes/auth/google');
const topics = require('./routes/api/topics');

const app = express();

app.use(bodyParser());

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [cookieKey]
	})
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth/google', google);
app.use('/api/topics', topics);

app.get('/', (req, res) => {
	res.send('Home');
});

app.get('/profile', authenticate, (req, res) => {
	res.send(req.user);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
