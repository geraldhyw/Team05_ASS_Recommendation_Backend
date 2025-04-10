const express = require('express')
const router = express.Router()
const recController = require("../controllers/recommendations")

// GET
router.get('/:userID', recController.getRecommendationsByUser)
router.post('/view/:userID/:productID', recController.addViewByUser)
router.post('/book/:userID/:productID', recController.addBookByUser)
// router.get('/actions', recController.viewActions)

module.exports = router