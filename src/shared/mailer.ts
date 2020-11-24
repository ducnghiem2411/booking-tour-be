import { createTransport } from 'nodemailer'
import { mailer } from 'src/config'
import { IsEmail, IsNotEmpty } from 'class-validator'

class SendMailOptions {
  @IsNotEmpty()  
  @IsEmail()
  from: string
  
  @IsNotEmpty()  
  @IsEmail()
  to: string

  @IsNotEmpty()
  subject: string

  text?: string

  html?: string
}

const transporter = createTransport({
  service: mailer.service,
  auth: {
    user: mailer.user,
    pass: mailer.password
  }
})

export const sendMail = async (options: SendMailOptions) => {
  const sender = await transporter.sendMail({
    from: options.from, //email sender
    to: options.to, //email receiver
    subject: options.subject,
    text: options.text,
    html: options.html
  })
  return sender
}
