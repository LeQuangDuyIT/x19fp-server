import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const create = asyncHandler(async (req, res) => {
  const user = req.user;

  const { password, id } = req.body;

  const existingTest = await db.tests.findOne({ _id: new ObjectId(id) });
  if (!existingTest) {
    res.status(400);
    throw new Error('Không tìm thấy đề');
  }

  if (!existingTest.isActived) {
    res.status(400);
    throw new Error('Đề hiện không hoạt động');
  }

  if (password !== existingTest.passWord) {
    res.status(400);
    throw new Error('Password không đúng');
  }

  const ObjectIdArray = existingTest.questions.map(question => new ObjectId(question.id));

  // Tạo đối tượng idMap
  const idMap = {};
  ObjectIdArray.forEach((id, index) => {
    idMap[id.toString()] = index;
  });

  // Lấy các câu hỏi từ cơ sở dữ liệu và duy trì thứ tự
  let questions = await Promise.all(ObjectIdArray.map(id => db.questions.findOne({ _id: id })));

  // Sắp xếp lại mảng questions theo thứ tự của ObjectIdArray
  questions.sort((a, b) => idMap[a._id.toString()] - idMap[b._id.toString()]);

  // Gán điểm số từ existingTest.questions vào questions
  questions = questions.map((question, index) => ({
    ...question,
    score: existingTest.questions[index].score
  }));

  const recordData = {
    ...existingTest,
    testId: existingTest._id,
    _id: new ObjectId(),
    questions,
    userId: user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await db.records.insertOne(recordData);

  res.json({ data: recordData });
});

const RecordController = {
  create
};

export default RecordController;
