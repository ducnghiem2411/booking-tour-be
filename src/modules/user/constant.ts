export const forgetPasswordMail = (to, url) => {
  return {
    from: 'nesttour@gmail.com',
    to: to,
    subject: 'Nest tour - Reset password',
    text: 
    `
    You are receiving this because you (or someone else) have requested the reset of the password for your account
    Please click on the following link, or paste this into your browser to complete the process:
    ${url}
    If you don't want reset password, please ignore this email and your password won't be changed
    `
  }
}

export const forgetPasswordResponseMail = (to, password) => {
  return {
    from: 'nesttour@gmail.com',
    to: to,
    subject: 'Nest tour - Reset password done',
    html:
    `
    <p>Your new password is: <b>${password}</b></p>
    <a href="https://localhost:3000/login" target="blank">Login to Tour Nest</a>
    `
  }
}

export const createAccountMail = (to, username) => {
  return {
    from: 'nesttour@gmail.com',
    to: to,
    subject: 'Nest tour - Confirm registration',
    text:
    `
    Welcome to nest tour
    Thank you ${username} for registering! 
    Please click this follow link to active your account
    `
  }
}
