import asyncHandler from 'express-async-handler';
import sendMail from '../services/mailer.js';

export const sendVerifyMail = asyncHandler(async (req, res) => {
  const { receiverMail } = req.body;
  const infor = await sendMail(receiverMail);
  res.status(200).json({
    message: infor
  });
});
