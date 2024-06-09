const { connect } = require('amqplib')

const queueConnectionString = process.env.MQ_CONNECTION_STRING
const mailRegisterAndLoginQueueName = process.env.MAIL_REGISTER_AND_LOGIN_QUEUE_NAME

const sendRegisterMail = async (email) => {
  try {
    const connection = await connect(queueConnectionString)
    const channel = await connection.createChannel()

    await channel.assertExchange(mailRegisterAndLoginQueueName, 'fanout')
    await channel.assertQueue(mailRegisterAndLoginQueueName)
    await channel.bindQueue(mailRegisterAndLoginQueueName, mailRegisterAndLoginQueueName, '')

    await channel.publish(mailRegisterAndLoginQueueName, 'fanout', Buffer.from(JSON.stringify(
      {
        email
      })))
  } catch (e) {
    console.error(e)
  }
}

module.exports = sendRegisterMail
