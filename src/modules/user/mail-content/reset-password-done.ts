export const resetPasswordResponseMail = (to, username, password) => {
  return {
    from: 'Tour Nest <tour.nest.team@gmail.com>',
    to: to,
    subject: 'Reset password done',
    html:
    `
    <div>
    <header style="background: rgba(77,78,84,1);
      color: white;
      font-size: 24px;
      font-family: 'Poppins', sans-serif;
      text-transform: capitalize;
      font-weight: 600;
      letter-spacing: 1px;
      text-align: center;
      width: 1024px;
      margin: 0 auto;
      padding: 20px 0;">
        Tour<span style="color: #00d8ff;">Nest</span>
    </header>
    <div style="padding: 20px 0;
    width: 1024px;
    margin: 0 auto;">
        <p style="color: grey;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;">Dear ${username},</p>
        <p style="color: grey;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;">You recently made a request to reset your password.</p>
        <p style="color: grey;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;">Your new password: <b style=" font-size: 18px;
        font-family: 'Poppins', sans-serif;">${password}</b> </p>
        <div style="margin: 20px 0 30px 0;">
        <a href="#" style="background: #1b94ba;
        color: white;
        outline: none;
        border: none;
        border-radius: 5px;
        padding: 8px 10px;
        width: auto;
        display: inline-block;
        text-decoration: none;">Login in Tour Nest</a>
    </div>
        <p style="color: grey;margin-bottom: 5px;margin: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;">Regards,</p>
        <p style="color: grey;margin: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;">Tour Nest team</p>
    </div> 
    `
  }
}

