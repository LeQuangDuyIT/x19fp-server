import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

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
  getQuestionById,
  getMyQuestions
};

export default QuestionController;
