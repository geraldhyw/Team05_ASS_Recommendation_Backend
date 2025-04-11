const { Sequelize } = require('sequelize')
const AWS = require('aws-sdk')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
})

const configureAWS = () => {
  const config = {
    region: process.env.AWS_REGION || 'ap-southeast-1', // default region
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000', // local DynamoDB endpoint
  }

  if (process.env.CI === 'true') {
    config.credentials = {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    }
  }

  AWS.config.update(config)

  AWS.config.logger = console
}

module.exports = {
    sequelize, 
    configureAWS
}