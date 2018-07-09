const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the question
let ResultSchema = new Schema({
	sessionId: {
		// Unique session id
		type: String,
		required: true
	},
	questionId: {
		// ID of the question
		type: String,
		required: true
	},
	answer: {
		// Answer
		type: String,
		required: true
	}
});


// Export the model
module.exports = mongoose.model('Result', ResultSchema);