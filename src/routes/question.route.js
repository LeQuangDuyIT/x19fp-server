import express from 'express';
import { validateMdw } from '../middlewares/validate.mdw.js';
import QuestionValidator from '../valdationSchema/question.validator.js';
import QuestionController from '../controllers/question.controller.js';

const router = express.Router();

router.post(
  '/choice',
  validateMdw(QuestionValidator.createMultipleChoiceSchema),
  QuestionController.createMultipleChoice
);

router.get('/:id', QuestionController.getQuestionById);

export default router;
