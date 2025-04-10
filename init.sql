CREATE DATABASE IF NOT EXISTS mysqldb;

USE mysqldb;

CREATE TABLE IF NOT EXISTS  users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    createdBy INT,
    vehicleType VARCHAR(255) NOT NULL,
    vehicleModel VARCHAR(255) NOT NULL,
    transmissionType VARCHAR(255) NOT NULL,
    pricePerDay DECIMAL(10, 2) NOT NULL,
    fuelType VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS product_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productID INT,
    date DATETIME NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (productID) REFERENCES products(id)
);

INSERT IGNORE INTO users (username, password)
VALUES 
    ('alice', 'password123'),
    ('bob', 'password123'),
    ('charlie', 'password123');

INSERT IGNORE INTO products (createdBy, vehicleType, vehicleModel, transmissionType, pricePerDay, fuelType)
VALUES
    (1, 'SUV', 'Honda Vezel 2021', 'Automatic', 80, 'Petrol'),
    (2, 'Saloon', 'Toyota Camry 2020', 'Automatic', 100, 'Hybrid'),
    (3, 'MPV', 'Ford Galaxy 2019', 'Manual', 90, 'Diesel'),
    (1, 'SUV', 'Toyota Land Cruiser 2020', 'Automatic', 130, 'Diesel'),
    (2, 'Saloon', 'Honda Accord 2020', 'Automatic', 90, 'Hybrid'),
    (3, 'MPV', 'Mercedes-Benz V-Class 2021', 'Automatic', 140, 'Diesel'),
    (1, 'SUV', 'BMW X5 2020', 'Automatic', 150, 'Petrol'),
    (2, 'Saloon', 'Audi A4 2021', 'Automatic', 110, 'Diesel'),
    (3, 'MPV', 'Volkswagen Sharan 2020', 'Automatic', 120, 'Diesel'),
    (1, 'SUV', 'Tesla Model X 2021', 'Manual', 200, 'Electric'),
    (2, 'Saloon', 'BMW i4 2022', 'Manual', 180, 'Electric'),
    (3, 'MPV', 'Rivian R1S 2022', 'Manual', 220, 'Electric'),
    (1, 'SUV', 'Ford Mustang Mach-E 2021', 'Manual', 160, 'Electric'),
    (2, 'Saloon', 'Lucid Air 2022', 'Manual', 250, 'Electric'),
    (3, 'MPV', 'Volkswagen ID.4 2021', 'Manual', 170, 'Electric'),
    (1, 'SUV', 'Nissan Ariya 2022', 'Manual', 210, 'Electric'),
    (2, 'Saloon', 'Porsche Taycan 2021', 'Manual', 270, 'Electric');

INSERT IGNORE INTO product_bookings (productID, date)
VALUES
    (2, '2025-01-10T00:00:00.000Z'),
    (2, '2025-01-11T00:00:00.000Z'),
    (2, '2025-01-20T00:00:00.000Z'),
    (2, '2025-01-25T00:00:00.000Z');
