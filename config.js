const { Sequelize } = require('sequelize')
const AWS = require('aws-sdk')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
})

const configureAWS = () => {
  AWS.config.update({
    region: process.env.AWS_REGION || 'ap-southeast-1',
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
    ...(process.env.CI === 'true' && {
      accessKeyId: 'test',
      secretAccessKey: 'test'
    })
  })

  AWS.config.logger = console

}

module.exports = {
    sequelize, 
    configureAWS
}