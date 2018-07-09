// Import result & question model
const Result = require('./../model/result.model');

// Implement an endpoint
exports.getResults = function (req, res) {
	// Get results
	Result.find({ sessionId: req.query.sessionId }, function (err, resultDocs) {
		// Are any errors present?
		if (err) {
			return next(err);
		}

		// Return data
		res.send(resultDocs);
	})       
};

exports.postAnswers = function (req, res, next) {
	// Create an array of results
	const results = req.body.results.map(x => {
		return new Result({
			sessionId: x.sessionId,
			questionId: x.questionId,
			answer: x.answer
		});
	});

	// Save all to the database
	results.forEach(x => {
		x.save(function (err) {
			if (err) {
             return next(err);
        	}
		});
	})

	// Send response
	res.send('Results saved successfully');
};