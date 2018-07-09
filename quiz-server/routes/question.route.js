const express = require('express');
const router = express.Router();

// Require question controller
const questionController = require('./../controllers/question.controller');

// Declare routes
router.get('/', questionController.getQuestions);
router.post('/create', questionController.createQuestion);

// Export router
module.exports = router;