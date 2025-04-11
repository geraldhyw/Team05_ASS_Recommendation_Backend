const { Sequelize } = require('sequelize')
const AWS = require('aws-sdk')
const Product = require('./models/products')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
})

sequelize.models = {
  Product
}

const configureAWS = () => {
  AWS.config.update({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
    ...(process.env.CI === 'true' && {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
      }
    })
  })

  AWS.config.logger = console

}

module.exports = {
    sequelize, 
    configureAWS
}