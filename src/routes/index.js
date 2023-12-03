import express from 'express';
import authRouter from './auth.route.js';
import collectionRouter from './collection.route.js';
import questionRouter from './question.route.js';
import userProfileRouter from './userProfile.roure.js';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/collections', collectionRouter);
router.use('/questions', questionRouter);
router.use('/user-profile', userProfileRouter);

export default router;
