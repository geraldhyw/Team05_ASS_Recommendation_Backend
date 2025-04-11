const sequelize = require('./config')
const { seedData } = require('./seed')
const { createActionTable, createRelatedPdtTable, seedRelatedPdtData } = require('./initDynamoDb')
const { exec } = require('child_process')

const stopDynamoDbContainer = async () => {
    return new Promise((resolve, reject) => {
        exec('docker stop dynamodb dynamodb-test', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error stopping DynamoDB containers: ${error}`)
                reject(error)
                return
            }
            console.log(`DynamoDB containers stopped: ${stdout}`)
            resolve(stdout)
        })
    })
}

const removeDynamoDbContainer = async () => {
    return new Promise((resolve, reject) => {
        exec('docker rm dynamodb dynamodb-test', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error removing DynamoDB containers: ${error}`)
                reject(error)
                return
            }
            console.log(`DynamoDB containers removed: ${stdout}`)
            resolve(stdout)
        })
    })
}

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


beforeAll(async () => {
    await sequelize.sync({ force: true }).then(async () => {
        await seedData()
    })
    
    await initDynamoDb()
})

afterAll(async () => {
    await sequelize.close()
    
    await stopDynamoDbContainer()
    await removeDynamoDbContainer()
})
