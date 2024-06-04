require('dotenv').config()
const { MongoClient } = require('mongodb')

let connectionString = ''
const databasename = process.env.DB_NAME

if (process.env.NODE_ENV !== 'test') {
  console.log('not testing')


  connectionString = process.env.MONGO_URL


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
