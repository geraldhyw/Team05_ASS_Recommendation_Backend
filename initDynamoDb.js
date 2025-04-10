const AWS = require('aws-sdk')
const { configureAWS } = require('./config')

configureAWS()
const dynamodb = new AWS.DynamoDB()
const dynamoDocClient = new AWS.DynamoDB.DocumentClient()

const createRelatedPdtTableParams = {
    TableName: 'related_products',
    KeySchema: [
      { AttributeName: 'productID', KeyType: 'HASH' },  // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'productID', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
}

const createRelatedPdtTable = async () => {
    try {
      const data = await dynamodb.createTable(createRelatedPdtTableParams).promise()
      console.log('Related pdt table created successfully:', data)
      return true
    } catch (err) {
      console.error('Error creating related pdt table', err)
      return false
    }
}
  
const seedRelatedPdtData = async () => {
    const exitingItems = await dynamoDocClient.scan({
        TableName: 'related_products',
    }).promise()

    if (exitingItems.Items.length > 0) return 

    const relatedPdtData = [
        { productID: 1, relatedProductIDs: [10, 11, 12] },
        { productID: 2, relatedProductIDs: [1, 2, 3] },
        { productID: 3, relatedProductIDs: [4, 5, 6] },
        { productID: 4, relatedProductIDs: [4, 5, 6] },
        { productID: 5, relatedProductIDs: [4, 5, 6] },
        { productID: 6, relatedProductIDs: [4, 5, 6] },
        { productID: 7, relatedProductIDs: [4, 5, 6] },
        { productID: 8, relatedProductIDs: [4, 5, 6] },
        { productID: 9, relatedProductIDs: [4, 5, 6] },
        { productID: 10, relatedProductIDs: [4, 5, 6] },
        { productID: 11, relatedProductIDs: [4, 5, 6] },
        { productID: 12, relatedProductIDs: [4, 5, 6] },
        { productID: 13, relatedProductIDs: [4, 5, 6] },
        { productID: 14, relatedProductIDs: [4, 5, 6] },
        { productID: 15, relatedProductIDs: [4, 5, 6] },
        { productID: 16, relatedProductIDs: [4, 5, 6] },
        { productID: 17, relatedProductIDs: [4, 5, 6] },
    ]

    await Promise.all(relatedPdtData.map(async (related) => {
        try {
            await dynamoDocClient.put({
                TableName: 'related_products',
                Item: related,
            }).promise()
            console.log('Item inserted successfully:', related)
        } catch (err) {
            console.error('Error inserting item:', err)
        }
    }))
}

const createActionTableParams = {
    TableName: 'user_actions',
    KeySchema: [
        { AttributeName: 'userID', KeyType: 'HASH' },  // Partition key
        { AttributeName: 'timestamp', KeyType: 'RANGE' }  // Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: 'userID', AttributeType: 'N' },  // String type for userID
        { AttributeName: 'timestamp', AttributeType: 'N' },  // Number type for timestamp (Unix time)
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,  // Adjust based on your needs
        WriteCapacityUnits: 5,  // Adjust based on your needs
    },
}

const createActionTable = async () => {
    try {
      const data = await dynamodb.createTable(createActionTableParams).promise()
      console.log('Action table created successfully:', data)
      return true
    } catch (err) {
      console.error('Error creating action table', err)
      return false
    }
}
 

module.exports = { 
    createRelatedPdtTable, 
    createActionTable,
    seedRelatedPdtData
}