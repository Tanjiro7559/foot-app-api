const express = require('express');
const { getUserController, updateUserController,resetPasswordcontroller, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');




const router = express.Router()

// GET USER || GET
router.get('/getUser',  authMiddleware,getUserController);

//update user profile
router.put('/updateUser',authMiddleware,updateUserController);

//RESET Password
router.post('/resetPassword',authMiddleware,resetPasswordcontroller)

//password update
router.post('/updatepassword',authMiddleware,updateUserController)

// delete USER
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports=router;