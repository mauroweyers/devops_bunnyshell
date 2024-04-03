require('dotenv').config()
const { MongoClient } = require('mongodb')

console.log(process.env)

const databaseHostname = process.env.MONGO_URL
const databaseName = process.env.DB_NAME

console.log(databaseHostname)
console.log(databaseName)

const uri = databaseHostname

const client = new MongoClient(uri)

const db = client.db(databaseName)

module.exports = {

  db,
  client
}
