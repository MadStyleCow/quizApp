// Import question model
const Question = require('./../model/question.model');

// Implement an endpoint
exports.getQuestions = function (req, res) {
	// Get a list of questions
    Question.find({}, function (err, docs) {
    	// Are any errors present?
    	if (err) {
    		return next(err);
    	}

    	// Return values
        res.send(docs);
    });
};

exports.createQuestion = function (req, res, next) {
	// Create a question
	let question = new Question({
		id: req.body.id,
		text: req.body.text,
		options: req.body.options ? req.body.options: null,
		correctValue: req.body.correctValue
	});

	// Save it to the database
	question.save(function (err) {
        if (err) {
             return next(err);
        }
        res.send('Question created successfully')
    })
};