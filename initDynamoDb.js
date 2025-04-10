const AWS = require('aws-sdk')
const { configureAWS } = require('./config')

configureAWS()
const dynamodb = new AWS.DynamoDB()
const dynamoDocClient = new AWS.DynamoDB.DocumentClient()

const createTableParams = {
    TableName: 'related_posts',
    KeySchema: [
      { AttributeName: 'postID', KeyType: 'HASH' },  // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: 'postID', AttributeType: 'N' }, // Number type for postID
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
}

const createTable = async () => {
    try {
      const data = await dynamodb.createTable(createTableParams).promise()
      console.log('Table created successfully:', data)
      return true
    } catch (err) {
      console.error('Error creating table', err)
      return false
    }
}
  
const insertData = async () => {
    const exitingItems = await dynamoDocClient.scan({
        TableName: 'related_posts',
    }).promise()

    if (exitingItems.Items.length > 0) return 

    const relatedPostsData = [
        { postID: 1, postIDs: [1, 2, 3] },
        { postID: 2, postIDs: [1, 2, 3] },
        { postID: 3, postIDs: [1, 2, 3] },
        { postID: 4, postIDs: [1, 2, 3] },
        { postID: 5, postIDs: [1, 2, 3] },
        { postID: 6, postIDs: [1, 2, 3] },
        { postID: 7, postIDs: [1, 2, 3] },
        { postID: 8, postIDs: [1, 2, 3] },
        { postID: 9, postIDs: [1, 2, 3] },
        { postID: 10, postIDs: [1, 2, 3] },
        { postID: 11, postIDs: [1, 2, 3] },
        { postID: 12, postIDs: [1, 2, 3] },
        { postID: 13, postIDs: [1, 2, 3] },
        { postID: 14, postIDs: [1, 2, 3] },
        { postID: 15, postIDs: [1, 2, 3] },
        { postID: 16, postIDs: [1, 2, 3] },
        { postID: 17, postIDs: [1, 2, 3] },
    ]

    await Promise.all(relatedPostsData.map(async (related) => {
        try {
            await dynamoDocClient.put({
                TableName: 'related_posts',
                Item: related,
            }).promise()
            console.log('Item inserted successfully:', related)
        } catch (err) {
            console.error('Error inserting item:', err)
        }
    }))
}
 

module.exports = { 
    createTable, 
    insertData
}