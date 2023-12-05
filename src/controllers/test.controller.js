import asyncHandler from 'express-async-handler';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const create = asyncHandler(async (req, res) => {
  const user = req.user;

  const initialAnswers = Array.from({ length: 4 }, () => ({
    id: uuidv4(),
    content: '',
    isCorrect: false
  }));

  const newMultipleChoiceQuestion = {
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

  await db.questions.insertOne(newMultipleChoiceQuestion);

  const newTest = {
    _id: new ObjectId(),
    userId: user.id,
    title: '',
    description: '',
    subject: null,
    limitTime: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [newMultipleChoiceQuestion._id]
  };

  await db.tests.insertOne(newTest);

  res.status(201).json({ id: newTest._id });
});

const getTestById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTest = await db.tests.findOne({ _id: new ObjectId(id) });
  if (!existingTest) {
    res.status(400);
    throw new Error('Không tìm thấy bài thi/kiểm tra');
  }

  const ObjectIdArray = existingTest.questions.map(id => new ObjectId(id));
  const questions = await db.questions.find({ _id: { $in: ObjectIdArray } }).toArray();
  const testContent = { ...existingTest, questions };

  res.json({ data: testContent });
});

const updateTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const user = req.user;

  const { _id, userId, createdAt, ...rest } = payload;

  if (user.id !== userId) {
    res.status(400);
    throw new Error('Người dùng không hợp lệ');
  }

  if (_id !== id) {
    res.status(400);
    throw new Error('Dữ liệu gửi lên không hợp lệ');
  }

  const existingTest = await db.tests.findOne({ _id: new ObjectId(id) });
  if (!existingTest) {
    res.status(400);
    throw new Error('Không tìm thấy bài thi/kiểm tra');
  }

  const updatedFields = { ...existingTest, ...rest, updatedAt: new Date() };

  await db.tests.updateOne({ _id: new ObjectId(id) }, { $set: updatedFields });

  res.json({ message: 'Update dish successfully', data: updatedFields, isSuccess: true });
});

const deleteTestById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTest = await db.tests.findOne({ _id: new ObjectId(id) });
  if (!existingTest) {
    res.status(400);
    throw new Error('Không tìm thấy đề');
  }

  await db.tests.deleteOne({ _id: new ObjectId(id) });

  const ObjectIdArray = existingTest.questions.map(id => new ObjectId(id));
  await db.questions.deleteMany({ _id: { $in: ObjectIdArray } });

  res.json({ message: 'Xóa thành công', isDeleted: true });
});

const TestController = {
  create,
  getTestById,
  updateTest,
  deleteTestById
};

export default TestController;
