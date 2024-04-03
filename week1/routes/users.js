const express = require('express')

const router = express.Router()

const { db } = require('../services/database')

/* GET users listing. */

router.get('/', async function (req, res, next) {
  const users = await db.collection('users').find().toArray()

  res.json(users)
})

router.post('/', function (req, res, next) {
  db.collection('users').insertOne(req.body)

    .then((user) => res.status(201).json({ id: user.insertedId }))

    .catch(err => res.status(500).json(err))
})

module.exports = router
