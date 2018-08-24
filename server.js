const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const mongoose = require('./db/mongoose');

const users = require('./routes/api/users');
const topics = require('./routes/api/topics');

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
app.use('/api/topics', topics);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
