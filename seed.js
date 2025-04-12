const Product = require('./models/products')
const User = require('./models/users')
const ProductBooking = require('./models/productBookings')


async function seedData() {
    console.log('Starting data seeding..')
    await seedUser()
    await seedProducts()
    await seedProductBookings()
    console.log('Data seeded successfully!')
}

async function seedUser() {
    try {
        const count = await User.count()
        if (count > 0) {
            console.log('User table already has data. Skipping seed.')
            return
        }

        await User.bulkCreate([
            { username: 'alice', password: 'password123' },
            { username: 'bob', password: 'password123' },
            { username: 'charlie', password: 'password123' }
        ], {
            ignoreDuplicates: true
        })
        console.log('User data seeded successfully!')
    } catch (error) {
        console.error('Error seeding user data:', error)
    }
}

async function seedProductBookings() {
    try {
        const count = await ProductBooking.count()
        if (count > 0) {
            console.log('Product booking table already has data. Skipping seed.')
            return
        }

        await ProductBooking.bulkCreate([
            { productID: 2, date: '2025-01-10T00:00:00.000Z' },
            { productID: 2, date: '2025-01-11T00:00:00.000Z' },
            { productID: 2, date: '2025-01-20T00:00:00.000Z' },
            { productID: 2, date: '2025-01-25T00:00:00.000Z' },
        ], {
            ignoreDuplicates: true
        })
        console.log('Product booking data seeded successfully!')
    } catch (error) {
        console.error('Error seeding product booking data:', error)
    }
}

async function seedProducts() {
    try {
        const count = await Product.count()
        if (count > 0) {
            console.log('Product table already has data. Skipping seed.')
            return
        } 
        await Product.bulkCreate(products, {
            ignoreDuplicates: true
        })
        console.log('Product data seeded successfully!')
    } catch (error) {
        console.error('Error seeding products data:', error)
    }
}

const products = [
    { 
        createdBy: 1, 
        vehicleType: 'SUV', 
        vehicleModel: 'Honda Vezel 2021', 
        transmissionType: 'Automatic', 
        pricePerDay: 80, 
        fuelType: 'Petrol',
    },
    { 
        createdBy: 2, 
        vehicleType: 'Saloon', 
        vehicleModel: 'Toyota Camry 2020', 
        transmissionType: 'Automatic', 
        pricePerDay: 100, 
        fuelType: 'Hybrid'
    },
    { 
        createdBy: 3, 
        vehicleType: 'MPV', 
        vehicleModel: 'Ford Galaxy 2019', 
        transmissionType: 'Manual', 
        pricePerDay: 90, 
        fuelType: 'Diesel',
    },
    { 
        createdBy: 1, 
        vehicleType: 'SUV', 
        vehicleModel: 'Toyota Land Cruiser 2020', 
        transmissionType: 'Automatic', 
        pricePerDay: 130, 
        fuelType: 'Diesel',
    },
    { 
        createdBy: 2, 
        vehicleType: 'Saloon', 
        vehicleModel: 'Honda Accord 2020', 
        transmissionType: 'Automatic', 
        pricePerDay: 90, 
        fuelType: 'Hybrid',
    },
    { 
        createdBy: 3, 
        vehicleType: 'MPV', 
        vehicleModel: 'Mercedes-Benz V-Class 2021', 
        transmissionType: 'Automatic', 
        pricePerDay: 140, 
        fuelType: 'Diesel',
    },
    { 
        createdBy: 1, 
        vehicleType: 'SUV', 
        vehicleModel: 'BMW X5 2020', 
        transmissionType: 'Automatic', 
        pricePerDay: 150, 
        fuelType: 'Petrol',
    },
    { 
        createdBy: 2, 
        vehicleType: 'Saloon', 
        vehicleModel: 'Audi A4 2021', 
        transmissionType: 'Automatic', 
        pricePerDay: 110, 
        fuelType: 'Diesel',
    },
    { 
        createdBy: 3, 
        vehicleType: 'MPV', 
        vehicleModel: 'Volkswagen Sharan 2020', 
        transmissionType: 'Automatic', 
        pricePerDay: 120, 
        fuelType: 'Diesel',
    },
    {
        createdBy: 1,
        vehicleType: 'SUV',
        vehicleModel: 'Tesla Model X 2021',
        transmissionType: 'Manual', 
        pricePerDay: 200,
        fuelType: 'Electric'
    },
    {
        createdBy: 2,
        vehicleType: 'Saloon',
        vehicleModel: 'BMW i4 2022',
        transmissionType: 'Manual', 
        pricePerDay: 180,
        fuelType: 'Electric'
    },
    {
        createdBy: 3,
        vehicleType: 'MPV',
        vehicleModel: 'Rivian R1S 2022',
        transmissionType: 'Manual',
        pricePerDay: 220,
        fuelType: 'Electric'
    },
    {
        createdBy: 1,
        vehicleType: 'SUV',
        vehicleModel: 'Ford Mustang Mach-E 2021',
        transmissionType: 'Manual',
        pricePerDay: 160,
        fuelType: 'Electric'
    },
    {
        createdBy: 2,
        vehicleType: 'Saloon',
        vehicleModel: 'Lucid Air 2022',
        transmissionType: 'Manual', 
        pricePerDay: 250,
        fuelType: 'Electric'
    },
    {
        createdBy: 3,
        vehicleType: 'MPV',
        vehicleModel: 'Volkswagen ID.4 2021',
        transmissionType: 'Manual',
        pricePerDay: 170,
        fuelType: 'Electric'
    },
    {
        createdBy: 1,
        vehicleType: 'SUV',
        vehicleModel: 'Nissan Ariya 2022',
        transmissionType: 'Manual',
        pricePerDay: 210,
        fuelType: 'Electric'
    },
    {
        createdBy: 2,
        vehicleType: 'Saloon',
        vehicleModel: 'Porsche Taycan 2021',
        transmissionType: 'Manual',
        pricePerDay: 270,
        fuelType: 'Electric'
    }
]

module.exports = { seedData }