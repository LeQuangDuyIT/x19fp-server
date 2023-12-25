import express from 'express';
import studyGroup from '../controllers/studyGroup.controller.js';
import authMiddleware from '../middlewares/auth.mdw.js';

const router = express.Router();

router.post('/create-study-group', authMiddleware, studyGroup.createGroup);
router.get('/get-groups', authMiddleware, studyGroup.getGroupByUser);

export default router;
