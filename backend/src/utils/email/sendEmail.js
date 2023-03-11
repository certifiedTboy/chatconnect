const { transport } = require("../../services/emailService");
require("dotenv").config();

const smtpUser = process.env.SMTP_USER;

const sendPasswordResetToken = async (email, name, token) => {
  const mailOptions = {
    to: email,
    from: smtpUser,
    subject: "CHAT-CONNECT - ACCOUNT PASSWORD RESET ",

    html: `<div> 
        
    <p> Hi <strong>${name} </strong> </p>,

    <h4> Here is the code to reset your password ${token} </h4>

    <p>Thanks </p>.
    <div>
    `,
  };

  transport.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log({ success: "email is sent successfully", token });
  });
};

module.exports = {
  sendPasswordResetToken,
};
