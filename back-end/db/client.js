const { Client } = require('pg');
require("dotenv").config()

let DATABASE_URL = process.env.DATABASE_URL
console.log(DATABASE_URL)
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});
console.log("called client")
module.exports = client;