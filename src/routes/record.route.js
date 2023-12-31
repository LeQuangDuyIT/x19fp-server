import express from 'express';
import authMiddleware from '../middlewares/auth.mdw.js';
import RecordController from '../controllers/record.controller.js';

const router = express.Router();

router.post('/', authMiddleware, RecordController.create);
router.put('/:id', authMiddleware, RecordController.updateRecord);

export default router;
