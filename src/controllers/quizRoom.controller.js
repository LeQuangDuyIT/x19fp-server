import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';

const create = asyncHandler(async (req, res) => {
  const user = req.user;
  const { roomID } = req.body;

  const existingRoom = await db.quizRooms.findOne({ roomID: roomID });
  if (existingRoom) {
    res.status(400);
    throw new Error('Mã phòng đã tồn tại');
  }

  const newRoom = {
    roomID,
    userId: user.id,
    userFullname: user.fullname,
    userEmail: user.email,
    createdAt: new Date(),
    updatedAt: new Date(),
    topic: '',
    answers: {},
    correct: '',
    time: null,
    players: {}
  };

  await db.quizRooms.insertOne(newRoom);

  res.status(201).json({ id: roomID });
});

const getQuizRoomById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingRoom = await db.quizRooms.findOne({ roomID: id });
  if (!existingRoom) {
    res.status(400);
    throw new Error('Room không tồn tại!');
  }

  res.json({ data: existingRoom });
});

const QuizRoomController = {
  create,
  getQuizRoomById
};

export default QuizRoomController;
