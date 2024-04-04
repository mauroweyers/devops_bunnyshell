require('dotenv').config()
const { MongoClient } = require('mongodb')

let connectionString = ''
const databasename = process.env.DB_NAME

if (process.env.NODE_ENV !== 'test') {
  console.log('not testing')


  const databaseUsername = process.env.DB_USERNAME
  const databasePassword = process.env.DB_PASSWORD
  const databaseHostname = process.env.MONGO_URL
  connectionString = `mongodb://${databaseUsername}:${databasePassword}@${databaseHostname}/`




} else {
  console.log('testing')
  connectionString = process.env.MONGO_URL

}
console.log("connection string:")
  console.log(connectionString)

const client = new MongoClient(connectionString)
const db = client.db(databasename)

module.exports = {
  db,
  client
}
