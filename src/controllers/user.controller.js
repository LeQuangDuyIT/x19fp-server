import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const getAll = await db.users.find().toArray();
    res.status(200).json({
      message: 'Lấy dữ liệu thành công',
      data: getAll
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await db.users.findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      return res.status(400).json({ message: 'Không tìm thấy tài khoản ' });
    }

    await db.users.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({
      message: 'Xóa tài khoản thành công'
    });
  } catch (error) {}
});

const user = {
  getAllUser,
  deleteUser
};

export default user;
