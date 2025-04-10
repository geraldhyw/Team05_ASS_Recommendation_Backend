const express = require('express');
const router = express.Router();
const recController = require("../controllers/recommendations")

// GET
router.get('/', recController.getRecommendationsByUser)

module.exports = router;