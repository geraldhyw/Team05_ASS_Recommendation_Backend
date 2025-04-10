const express = require('express')
const recsRoute = require('./routes/recommendations')
const { createTable, insertData } = require('./initDynamoDb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const initDynamoDb = async () => {
    try {
      const tableCreated = await createTable() 
      if (tableCreated) {
        await insertData()
      }
    } catch (error) {
      console.error('Error initializing DynamoDB:', error)
    }
  }

  initDynamoDb().then(() => {
    app.use("/recommendations", recsRoute)
  
    app.listen(port, () => {
      console.log(`Node.js HTTP server is running on port ${port}`)
    })
})