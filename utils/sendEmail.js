const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try{
   // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    auth: {
      user: "MS_FrmJ57@mindversitysport.com",
      pass: "mssp.Ibq0hRf.jy7zpl93r7rl5vx6.bXYE9mg",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Mindversity Sport <mindversitysports@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: options.text
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);     
    }catch(error){
        console.log(error);
    }
  
};

module.exports = {sendEmail};