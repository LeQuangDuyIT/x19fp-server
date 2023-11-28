import nodemailer from 'nodemailer';
const adminUser = 'duynhannguyenn@gmail.com';
const adminPassword = 'jvmj ktsw ajve lxol';

const sendVerificationMail = async receiverMail => {
  const verificationCode = Math.floor(Math.random() * (1000 - 9999 + 1)) + 9999;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: adminUser,
      pass: adminPassword
    }
  });
  const options = {
    from: `x19fp,<${adminUser}>`,
    to: receiverMail,
    subject: 'Sign Up Verification ',
    html: `<p>Hello ${receiverMail}, this is your verification code : <b> ${verificationCode}</b> </p>` // html body
  };
  const response = await transporter.sendMail(options);
  return { message: response.response, code: verificationCode };
};

export default sendVerificationMail;
