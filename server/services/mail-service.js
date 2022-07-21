const nodemailer = require('nodemailer')

const ApiError = require('../exceptions/api-error')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.APP_PASSWORD,
      },
    })
  }

  sendActivationMail = async (to, link) => {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `,
      })
    } catch (error) {
      throw ApiError.BadRequest('ошибка при создании ссылки активации, попробуйте позже')
    }
  }
}

module.exports = new MailService()