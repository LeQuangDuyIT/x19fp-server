import express from 'express';
import userProfile from '../controllers/userProfile.controller.js';
import uploadMdw from '../middlewares/upload.mdw.js';
const router = express.Router();

router.put('/:id/upload-profileimg', uploadMdw.single('picture'), userProfile.uploadProfileImage);
router.put('/:id/update-profile', userProfile.editProfileUser);

export default router;
