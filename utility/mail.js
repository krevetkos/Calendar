const nodemailer = require('nodemailer')
const config = require('config')

async function mail (subject, text, address) {
  const transporter = nodemailer.createTransport({
    name: config.get('mail.name'),
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: config.get('mail.user'),
      pass: config.get('mail.pass')
    },
    tls: {
      rejectUnauthorized: false
    }
  })
  const info = await transporter.sendMail({
    from: config.get('mail.user'),
    to: address,
    subject: subject,
    text: text
  })
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
}
exports.sentMail = mail
