import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import { db } from '../config/database.js';

const getAllUser = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  try {
    const getUser = await db.users.find().skip(skip).limit(limit).toArray();
    const getAllUser = await db.users.countDocuments();
    const totalPage = Math.ceil(getAllUser / limit);
    res.status(200).json({
      message: 'Lấy dữ liệu thành công',
      data: getUser,
      paginationData: {
        totalItems: getAllUser,
        limit,
        currentPage: page,
        totalPage
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const idStringList = req.params.id;
    const idArrayList = idStringList.split(',');
    const getAll = await db.users.find().toArray();
    for (let i = 0; i < idArrayList.length; i++) {
      const idArrayListElement = idArrayList[i];
      console.log(idArrayListElement);
      const existingUser = getAll.filter(user => user._id.toString() === idArrayListElement);
      console.log(existingUser);
      if (!existingUser) {
        return res.status(400).json({ message: 'Không tìm thấy tài khoản ' });
      }
      await db.users.deleteOne({ _id: new ObjectId(idArrayListElement) });
    }

    res.status(200).json({
      message: 'Xóa tài khoản thành công'
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});

const user = {
  getAllUser,
  deleteUser
};

export default user;
