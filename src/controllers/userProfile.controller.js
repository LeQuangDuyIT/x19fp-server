import asyncHandler from 'express-async-handler';
import { ObjectId } from 'mongodb';
import cloudinaryService from '../services/cloudinary.js';
import { db } from '../config/database.js';
import { json } from 'express';
const uploadProfileImage = asyncHandler(async (req, res) => {
  const file = req.file;
  console.log('file', file);
  const id = req.params.id;
  console.log('id', id);
  const getUser = await db.users.findOne({ _id: new ObjectId(id) });
  if (!getUser) {
    return (
      res.status(500),
      json({
        message: 'Không tìm thấy tài khoản'
      })
    );
  }
  const uploadFile = await cloudinaryService.updateSingleFile(file.path);
  console.log('cloudinary', uploadFile);
  const updatePicture = { ...getUser, picture: uploadFile.url, pictureId: uploadFile.id };
  await db.users.updateOne({ _id: new ObjectId(id) }, { $set: updatePicture });
  res.status(200).json({
    message: 'Ảnh đại diện đã được cập nhật '
  });
});
const editProfileUser = asyncHandler(async (req, res) => {});

const userProfile = { uploadProfileImage, editProfileUser };
export default userProfile;
