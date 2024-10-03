const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { createResturantController } = require('../controllers/resturantController');

const router = express.Router()

//routes
//CREATE RESTAURANT || Post 
router.post('/create',authMiddleware,createResturantController)



module.exports=router;