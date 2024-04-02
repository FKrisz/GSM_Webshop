import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL_SECRET_ADDRESS = process.env.EMAIL_SECRET_ADDRESS;
const EMAIL_SECRET_PASSWORD = process.env.EMAIL_SECRET_PASSWORD;

const sendEmail = async (to, subject, htmlContent) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_SECRET_ADDRESS,
      pass: EMAIL_SECRET_PASSWORD,
    },
  });

  // Mail options
  const mailOptions = {
    from: EMAIL_SECRET_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  // Send mail with defined transport object
  return transporter.sendMail(mailOptions);
};

export {
  sendEmail,
};
