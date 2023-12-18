import express from 'express';
import authRouter from './auth.route.js';
import collectionRouter from './collection.route.js';
import questionRouter from './question.route.js';
import testRouter from './test.route.js';
import userProfileRouter from './userProfile.roure.js';
import userRouter from './user.route.js';
import recordRouter from './record.route.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/collections', collectionRouter);
router.use('/questions', questionRouter);
router.use('/tests', testRouter);
router.use('/user-profile', userProfileRouter);

export default router;
