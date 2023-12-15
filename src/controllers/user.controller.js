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
    const idStringList = req.params.id;
    const idArrayList = idStringList.split(',');
    const getAll = await db.users.find().toArray();
    console.log(getAll[5]._id);
    for (let i = 0; i < idArrayList.length; i++) {
      const idArrayListElement = idArrayList[i];
      console.log(idArrayListElement);
      const existingUser = getAll.filter(user => user._id === idArrayListElement);
      console.log(existingUser);
      if (!existingUser) {
        return res.status(400).json({ message: 'Không tìm thấy tài khoản ' });
      }
      // for (let j = 0; j < array.length; j++) {
      //   const element = array[j];

      // }
    }

    // await db.users.deleteOne({ _id: new ObjectId(id) });
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
