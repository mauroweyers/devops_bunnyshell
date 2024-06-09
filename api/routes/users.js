const express = require('express')

const router = express.Router()

const { db } = require('../services/database')
const sendRegisterMail = require('../mq/sendRegisterMail')

/* GET users listing. */

router.get('/', async function (req, res, next) {
  const users = await db.collection('users').find().toArray()

  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await db.collection('users').insertOne(req.body)

    const email = req.body.email

    if (email) {
      await sendRegisterMail(email)
    }

    return res.status(201).json({ id: user.insertedId })
  } catch (err) {
    console.error('problem inserting user', err)
    return res.status(500).json(err)
  }
})

module.exports = router
