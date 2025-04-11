const express = require('express')
const recsRoute = require('./routes/recommendations')
const { createActionTable, createRelatedPdtTable, seedRelatedPdtData } = require('./initDynamoDb')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const initDynamoDb = async () => {
    try {
        await createActionTable()
        const relatedPdtTable = await createRelatedPdtTable() 
        if (relatedPdtTable) {
            await seedRelatedPdtData()
        }
    } catch (error) {
        console.error('Error initializing DynamoDB:', error)
    }
  }

if (process.env.NODE_ENV !== "production") {
    initDynamoDb().then(() => {
        app.use("/recommendations", recsRoute)
      
        app.listen(port, () => {
            console.log(`Node.js HTTP server is running on port ${port}`)
        })
    })
} else {
    app.use("/recommendations", recsRoute)
      
    app.listen(port, () => {
        console.log(`Node.js HTTP server is running on port ${port}`)
    })
}