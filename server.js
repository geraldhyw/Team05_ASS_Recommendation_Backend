const express = require('express')
const recsRoute = require('./routes/recommendations')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use("/recommendations", recsRoute)

app.listen(port, () => {
    console.log(`Node.js HTTP server is running on port ${port}`)
})