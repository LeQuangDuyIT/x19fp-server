import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

const createMultipleChoice = asyncHandler(async (req, res) => {
  const user = req.user;
  const { topic, type, answers, subject, collection: collectionId, isPrivate } = req.body;

  let collection = {};
  if (collectionId) {
    const existingCollection = await db.collections.findOne({ _id: new ObjectId(collectionId) });
    const isColectionValid = existingCollection?.userId === user.id;
    if (existingCollection && isColectionValid) {
      collection = { id: collectionId, name: existingCollection.name };
    }
  }

  const newQuestion = {
    _id: new ObjectId(),
    userId: user.id,
    type,
    topic,
    answers,
    subject,
    collection,
    isPrivate,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.questions.insertOne(newQuestion);

  res.status(201).json({ id: newQuestion._id });
});

const initalQuestion = asyncHandler(async (req, res) => {
  const user = req.user;

  const initialAnswers = Array.from({ length: 4 }, () => ({
    id: uuidv4(),
    content: '',
    isCorrect: false
  }));

  const newQuestion = {
    _id: new ObjectId(),
    userId: user.id,
    type: 'multiple-choice',
    topic: '',
    answers: initialAnswers,
    subject: null,
    collection: null,
    isPrivate: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.questions.insertOne(newQuestion);

  const createdQuestion = await db.questions.findOne({ _id: newQuestion._id });

  res.status(201).json({ data: createdQuestion });
});

const getQuestionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingQuestion = await db.questions.findOne({ _id: new ObjectId(id) });

  if (!existingQuestion) {
    res.status(400);
    throw new Error('Không tìm thấy câu hỏi');
  }

  res.json({ data: existingQuestion });
});

const getMyQuestions = asyncHandler(async (req, res) => {
  const user = req.user;

  const questions = await db.questions.find({ userId: user.id }).toArray();

  res.json({ data: questions });
});

const QuestionController = {
  createMultipleChoice,
  initalQuestion,
  getQuestionById,
  getMyQuestions
};

export default QuestionController;
