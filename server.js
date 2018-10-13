const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const mongoose = require('./db/mongoose');

const users = require('./routes/api/users');
const tags = require('./routes/api/tags');
const tutorials = require('./routes/api/tutorials');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/tags', tags);
app.use('/api/tutorials', tutorials);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set a static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
