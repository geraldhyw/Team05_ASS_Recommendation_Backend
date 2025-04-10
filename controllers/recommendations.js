const Product = require("../models/products")
const AWS = require('aws-sdk')
const { configureAWS } = require('../config')

configureAWS()
const dynamodb = new AWS.DynamoDB.DocumentClient()

const getRecommendationsByUser = async (req, res) => {
    try {
        const products = await Product.findAll()

        const exitingItems = await dynamodb.scan({
            TableName: 'related_posts',
        }).promise()
    
        // if (exitingItems.Items.length > 0) return 
        
        res.status(200).json(exitingItems.Items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getRecommendationsByUser
}