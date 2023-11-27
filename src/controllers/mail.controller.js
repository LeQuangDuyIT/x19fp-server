import asyncHandler from 'express-async-handler';

export const sendVerifyMail = asyncHandler(async (req, res) => {
  const { receiverMail } = req.body;
  console.log('email', receiverMail);
  await sendVerifyMail(receiverMail);
  const infor = sendVerifyMail();
  res.json({
    message: infor
  });
});
