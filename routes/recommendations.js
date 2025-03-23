const express = require('express');
const router = express.Router();

// GET
router.get('/', (req, res) => {
    res.send('/recommendation/testing')
})

module.exports = router;