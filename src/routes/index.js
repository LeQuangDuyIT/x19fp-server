import express from 'express';
import authRouter from './auth.route.js';
import collectionRouter from './collection.route.js';
import questionRouter from './question.route.js';
import testRouter from './test.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/collections', collectionRouter);
router.use('/questions', questionRouter);
router.use('/tests', testRouter);

export default router;
