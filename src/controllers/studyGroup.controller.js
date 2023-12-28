import asyncHandler from 'express-async-handler';
import { db } from '../config/database.js';

const getGroupByUser = asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    const getByUser = await db.groups.find({ userId: user.id }).toArray();
    const sortByTime = await getByUser.sort(
      (groupA, groupB) => new Date(groupB.createdAt) - new Date(groupA.createdAt)
    );
    res.status(200).json({
      data: sortByTime
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
});
const createGroup = asyncHandler(async (req, res) => {
  const user = req.user;
  const { studyGroup } = req.body;

  try {
    const existingGroup = await db.groups.findOne({ studyGroup });
    if (existingGroup) {
      return res.status(400).json({
        message: 'Nhóm đã tồn tại'
      });
    }
    const newGroup = {
      userId: user.id,
      studyGroup,
      createdAt: new Date(),
      updateAt: new Date()
    };
    await db.groups.insertOne(newGroup);
    res.status(200).json({
      message: 'Tạo nhóm thành công'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Tạo nhóm thất bại'
    });
  }
});
const studyGroup = {
  createGroup,
  getGroupByUser
};

export default studyGroup;
