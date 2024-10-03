const express = require('express');
const { registerController, logincontroller } = require('../controllers/authController');


const router = express.Router()

//routes
//Register || Post 
router.post('/register',registerController)

// Login || post
router.post("/login",logincontroller)



module.exports=router;