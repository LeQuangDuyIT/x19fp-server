import express from 'express';
import authMiddleware from '../middlewares/auth.mdw.js';
import TestController from '../controllers/test.controller.js';

const router = express.Router();

router.post('/', authMiddleware, TestController.create);
router.get('/mine', authMiddleware, TestController.getMyTests);
router.get('/:id', TestController.getTestById);
router.put('/:id', authMiddleware, TestController.updateTest);
router.delete('/:id', authMiddleware, TestController.deleteTestById);
router.put('/common/:id', authMiddleware, TestController.updateCommonField);

export default router;
