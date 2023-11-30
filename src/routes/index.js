import express from 'express';
import authRouter from './auth.route.js';
import questionRouter from './question.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/questions', questionRouter);

export default router;
