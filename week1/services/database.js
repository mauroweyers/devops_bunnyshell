require('dotenv').config()
const { MongoClient } = require('mongodb')

const databaseHostname = process.env.MONGO_URL
const databaseName = process.env.DB_NAME

const databaseUsername = process.env.DB_USERNAME
const databasePassword = process.env.DB_PASSWORD

const uri = databaseHostname

const connectionString = `mongodb://${databaseUsername}:${databasePassword}@${uri}/`;

const client = new MongoClient(connectionString)

const db = client.db(databaseName)

module.exports = {
  db,
  client
}
