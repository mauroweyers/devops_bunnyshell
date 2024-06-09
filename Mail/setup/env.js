require('dotenv').config()

const assert = require('node:assert')

assert.notEqual(process.env.MQ_CONNECTION_STRING, undefined, "MQ_CONNECTION_STRING, undefine required in .env")
assert.notEqual(process.env.SENDGRID_API_KEY, undefined, "SENDGRID_API_KEY, undefine required in .env")
assert.notEqual(process.env.SENDGRID_EMAIL_FROM, undefined, "SENDGRID_EMAIL_FROM, undefine required in .env")

assert.notEqual(process.env.MAIL_REGISTER_AND_LOGIN_QUEUE_NAME, undefined, "MAIL_REGISTER_AND_LOGIN_QUEUE_NAME, undefine required in .env")
