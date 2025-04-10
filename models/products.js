const { DataTypes } = require('sequelize')
const sequelize = require('../config')

const Product = sequelize.define('products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    vehicleType: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    vehicleModel: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    transmissionType: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    pricePerDay: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    fuelType: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Product