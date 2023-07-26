function GetRegisterMail(link: string) {
  return (`<!DOCTYPE html>
  <html>
  <head>
      <title>Welcome to Talker!</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #F0F0F0;">
    <div style="background-color: #ffffff; width: 80%; max-width: 600px; margin: 50px auto; border-radius: 15px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #171A21; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 15px 15px 0 0; padding: 30px 0px;">
        <h2 style="text-align: center; font-weight: 500; color: white;">Welcome to Talker!</h2>
      </div>

      <div style="padding: 30px;">
        <p style="text-align: center; font-size: 18px; color: #444444;">Hello,</p>
        <p style="text-align: center; font-size: 18px; color: #444444;">Thank you for registering on Talker!</p>

        <p style="text-align: center; font-size: 18px; color: #444444;">Click the button below to confirm your registration:</p>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${link}" style="background-color: #00B2B2; text-decoration: none; color: white; font-weight: 500; padding: 12px 20px; border-radius: 10px; display: inline-block;">Confirm Registration</a>
        </div>
      </div>
    </div>
  </body>
  </html>`);
};

export default GetRegisterMail;