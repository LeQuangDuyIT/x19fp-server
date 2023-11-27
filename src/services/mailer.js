import nodemailer from 'nodemailer';
// const nodemailer = require('nodemailer');
const adminUser = 'duynhannguyenn@gmail.com';
const adminPassword = '#Jgjhg2038';
const transporter = nodemailer.createTransport({
  host: 'smtp.forwardemail.net',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: adminUser,
    pass: adminPassword
  }
});

// async..await is not allowed in global scope, must use a wrapper
const sendVerMail = async receiverMail => {
  // send mail with defined transport object
  console.log('sendVermail', receiverMail);
  const info = await transporter.sendMail({
    from: adminPassword, // sender address
    to: receiverMail, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  });

  return info;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
};

sendVerMail()
  .then(data => {
    console.log(data);
    data;
  })
  .catch(console.error);

export default sendVerMail;
