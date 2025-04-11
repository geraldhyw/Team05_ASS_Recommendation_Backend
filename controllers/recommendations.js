const Product = require("../models/products")
const AWS = require('aws-sdk')
const { configureAWS } = require('../config')
const { Sequelize } = require('sequelize')

configureAWS()
const dynamodb = new AWS.DynamoDB()
const dynamoDocClient = new AWS.DynamoDB.DocumentClient()

const getRecommendationsByUser = async (req, res) => {
    try {
        const { userID } = req.params
        const allProducts = await Product.findAll()

        // find top 3 liked productID
        const userActions = await dynamodb.query({
            TableName: 'user_actions',
            KeyConditionExpression: 'userID = :userID',
            ExpressionAttributeValues: {
                ':userID': { N: userID },
            },
        }).promise();

        const actionCountMap = {}
        userActions.Items.forEach(item => {
            const viewScore = 1
            const bookScore = 3
            const addScore = item.action.S === "view" ? viewScore : bookScore

            if (!actionCountMap[item.productID.N]) {
                actionCountMap[item.productID.N] = 0;
            }
            actionCountMap[item.productID.N] = actionCountMap[item.productID.N] + addScore
        })

        const actionCountArray = Object.keys(actionCountMap).map(productID => ({
            productID,
            score: actionCountMap[productID] ?? 0
        }))
        actionCountArray.sort((a, b) => b.score - a.score)

        if (actionCountArray.length < 3) {
            return res.status(200).json(allProducts)
        }

        // get top 3 related products
        const relatedProducts = await dynamoDocClient.batchGet({
            RequestItems: {
                'related_products': {
                    Keys: [
                        { productID: Number(actionCountArray[0].productID) },
                        { productID: Number(actionCountArray[1].productID) },
                        { productID: Number(actionCountArray[2].productID) }
                    ]
                }
            }
        }).promise()

        if (relatedProducts.Responses && relatedProducts.Responses.related_products) {
            const result = relatedProducts.Responses.related_products

            const modifiedResult = result.flatMap(value => value.relatedProductIDs)

            const recommendedPdtIDs = [...new Set([...modifiedResult, ...allProducts.map(p => p.id)])]
            const recommendedPdts = await Product.findAll({
                where: {
                    id: {
                        [Sequelize.Op.in]: recommendedPdtIDs,
                    },
                },
                order: [
                    [Sequelize.literal(`FIELD(id, ${recommendedPdtIDs.join(',')})`)]
                ]
            })
            console.log(recommendedPdts)
            return res.status(200).json(recommendedPdts)
        } else {
            console.log('No related products found or no data returned')
            return res.status(200).json(allProducts)
        }

    } catch (error) {
        console.error('getRecommendationsByUser:', error.message);
        return res.status(500).json({ message: error.message })
    }
}

const addViewByUser = async (req, res) => {
    const { userID, productID } = req.params
    const params = {
      TableName: 'user_actions', 
      Item: {
        userID: Number(userID),
        timestamp: Date.now(),
        action: "view",
        productID: Number(productID),
      }
    }
  
    try {
      await dynamoDocClient.put(params).promise();
      res.status(200).json({ message: "View action added successfully!"})
      console.log('View added successfully');
    } catch (error) {
      console.error('Error adding view:', error);
    }
}

const addBookByUser = async (req, res) => {
    const { userID, productID } = req.params
    const params = {
      TableName: 'user_actions', 
      Item: {
        userID: Number(userID),
        timestamp: Date.now(),
        action: "book",
        productID: Number(productID),
      }
    };
  
    try {
      await dynamoDocClient.put(params).promise();
      res.status(200).json({ message: "Book action added successfully!"})
      console.log('Book added successfully');
    } catch (error) {
      console.error('Error adding book:', error);
    }
}

const viewActions = async(req, res) => {
    try {
        const exitingItems = await dynamoDocClient.scan({
            TableName: 'user_actions',
        }).promise()
        
        res.status(200).json(exitingItems.Items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getRecommendationsByUser, 
    addViewByUser,
    addBookByUser,
    viewActions
}