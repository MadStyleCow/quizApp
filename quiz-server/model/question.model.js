const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the question
let QuestionSchema = new Schema({
	id: {
		// ID of the question
		type: Number,
		required: true
	},
	text: {
		// Text of the question
		type: String,
		required: true
	},
	options: {
		type: Array,
		"default": null
	},
	correctValue: {
		// A value describing the correct value (either a straight up value or the ID of the correct option)
		type: String,
		required: true
	}
});


// Export the model
module.exports = mongoose.model('Question', QuestionSchema);