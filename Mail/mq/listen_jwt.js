

const amqp = require("amqplib")
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const queueConnectionString = process.env.MQ_CONNECTION_STRING
const mailRegisterAndLoginQueueName = process.env.MAIL_REGISTER_AND_LOGIN_QUEUE_NAME

const email_from = process.env.SENDGRID_EMAIL_FROM

const jwtMail = (email) => {

    const msg = {
        to: email, // Change to your recipient
        from: email_from, // Change to your verified sender
        subject: 'Dit is je e-mail',
        text: `Je email is ${email}, maar dat wist je waarschijnlijk al!`,
        html: `<p>Je email is <code>${email}</code>, maar dat wist je waarschijnlijk al!</p>`,
    }

    sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })
}



const listen_score = async () => {
    try {
        const connection = await amqp.connect(queueConnectionString)
        const channel = await connection.createChannel()

        await channel.assertExchange(mailRegisterAndLoginQueueName, 'fanout')
        await channel.assertQueue(mailRegisterAndLoginQueueName)
        await channel.bindQueue(mailRegisterAndLoginQueueName, mailRegisterAndLoginQueueName, '')

        await channel.consume(mailRegisterAndLoginQueueName, async (message) => {
            try {

                console.log(message.content.toString())

                const data = JSON.parse(message.content)

                jwtMail(data.email)

                channel.ack(message)
            } catch (e) {
                console.error(e)
            }
        })
    } catch (e) {
        console.error(e)
        throw (e)
    }
}

let connected = false
const reconnectInterval = 2000

setInterval(async () => {
    if (connected) return

    try {
        await listen_score()
        connected = true
        console.log('Connection success: listening to message queue')
    } catch (e) {
        connected = false
        console.error(`Connection failed: could not connect to message queue. Retrying in ${reconnectInterval}ms.`)
    }
}, reconnectInterval)

