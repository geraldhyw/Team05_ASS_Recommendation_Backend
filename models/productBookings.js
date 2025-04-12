const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

const ProductBooking = sequelize.define('product_bookings', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = ProductBooking