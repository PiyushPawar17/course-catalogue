const express = require('express');

const { mongoose } = require('./db/mongoose');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Listening to port ${port}`);
});
