import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
const adminUser = 'duynhannguyenn@gmail.com';
const adminPassword = 'jvmj ktsw ajve lxol';

const sendMail = async receiverMail => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: adminUser,
      pass: adminPassword
    }
  });
  const verificationCode = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
  const options = {
    from: adminPassword, // sender address
    to: receiverMail, // list of receivers
    subject: 'Sign Up Verification ', // Subject line
    text: '', // plain text body
    html: `<p>Hello ${receiverMail}, this is your verification code : <b> ${verificationCode}</b> </p>` // html body
  };
  const sendingMail = await transporter.sendMail(options);
  const data = {
    message: sendingMail,
    code: verificationCode
  };
  return data;
};

export default sendMail;
