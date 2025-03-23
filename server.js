const express = require('express')
const app = express()

const recsRoute = require('./routes/recommendations')

app.use("/recommendations", recsRoute)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`)
})