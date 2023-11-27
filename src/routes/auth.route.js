import express from 'express';

import AuthController from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';
import { validateMdw } from '../middlewares/validate.mdw.js';
import AuthValidator from '../valdationSchema/auth.validator.js';
import { sendVerifyMail } from '../controllers/mail.controller.js';

const router = express.Router();

router.post('/login', validateMdw(AuthValidator.loginSchema), AuthController.login);
router.post('/signup', validateMdw(AuthValidator.signupSchema), AuthController.signup);
router.get('/current-user', authMiddleware, AuthController.fetchCurrentUser);
router.post('/verifyMail', sendVerifyMail);
export default router;
