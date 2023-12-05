import express from 'express';
import authMiddleware from '../middlewares/auth.mdw.js';
import TestController from '../controllers/test.controller.js';

const router = express.Router();

router.post('/', authMiddleware, TestController.create);
router.get('/:id', TestController.getTestById);
router.put('/:id', authMiddleware, TestController.updateTest);

export default router;
