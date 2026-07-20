const db = require("../config/db");

db.serialize(() => {

    // Users Table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            password TEXT NOT NULL,

            verified INTEGER DEFAULT 0,

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

    // OTP Table
    db.run(`
        CREATE TABLE IF NOT EXISTS otp (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            email TEXT NOT NULL,

            otp TEXT NOT NULL,

            expiresAt INTEGER NOT NULL,

            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

    // Verified Emails Table
    db.run(`
        CREATE TABLE IF NOT EXISTS verifiedEmails (

            email TEXT PRIMARY KEY,

            verifiedAt INTEGER NOT NULL

        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS products (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    seller_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    description TEXT NOT NULL,

    category TEXT NOT NULL,

    price REAL NOT NULL,

    image TEXT,

    status TEXT DEFAULT 'available',

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (seller_id) REFERENCES users(id)

);`)
    

    console.log("✅ Database Initialized");

});

module.exports = db;
