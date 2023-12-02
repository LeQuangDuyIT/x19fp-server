import * as yup from 'yup';

const multipleChoiceAnswerSchema = yup.object().shape({
  id: yup.string().required(),
  content: yup.string().required(),
  isCorrect: yup.boolean().required()
});

const createMultipleChoiceSchema = yup.object().shape({
  topic: yup.string().required(),
  answers: yup.array().of(multipleChoiceAnswerSchema).min(2).required(),
  subject: yup.string().required(),
  type: yup.string().required()
});

const QuestionValidator = {
  createMultipleChoiceSchema
};

export default QuestionValidator;
