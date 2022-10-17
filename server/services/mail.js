require('dotenv').config({path: __dirname + '../../.env'});
const nodemailer = require('nodemailer');

const { GMAIL, PASSWORD } = process.env

class Mail {
  #transporter = null

  constructor() {
    this.#transporter = this.#getTransporter()
  }

  #getTransporter() {
    return nodemailer.createTransport({
      port: 465,              
      host: "smtp.gmail.com",
        auth: {
          user: GMAIL,
          pass: PASSWORD,
        },
      secure: true,
    })
  }

  async send(receiver, subject, message, html) {
    try {
      const info = await this.#transporter.sendMail({
        from: GMAIL,
        to: receiver,
        subject: subject,
        text: message,
        html: html
      })

      return info
    } catch(err) {
      return err
    }
  }
}

module.exports = new Mail()