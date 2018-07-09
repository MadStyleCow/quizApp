// System imports
const express = require('express');
const bodyParser = require('body-parser');

// Custom imports
const question = require('./routes/question.route');
const result = require('./routes/result.route');

// Initialize app
const app = express();

// Set up database connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://testUser:Password1!@ds131721.mlab.com:31721/quiz';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Configure app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allow CORS requests from any domain
app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-type");
	next();
});

// User imported routes
app.use('/questions', question);
app.use('/results', result);

// Define default port
const port = 1234;

// Listen to all incoming traffic
app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});