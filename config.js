const { Sequelize } = require('sequelize')
const AWS = require('aws-sdk')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
})

const configureAWS = () => {
  console.log(`process.env.CI: ${process.env.AWS_ACCESS_KEY_ID}`)
  console.log(`process.env.AWS_ACCESS_KEY_ID: ${process.env.AWS_ACCESS_KEY_ID}`)
  console.log(`process.env.AWS_SECRET_ACCESS_KEY: ${process.env.AWS_SECRET_ACCESS_KEY}`)
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