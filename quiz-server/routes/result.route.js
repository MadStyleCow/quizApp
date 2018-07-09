const express = require('express');
const router = express.Router();

// Require result controller
const resultController = require('./../controllers/result.controller');

// Declare routes
router.get('/', resultController.getResults);
router.post('/create', resultController.postAnswers);

// Export router
module.exports = router;