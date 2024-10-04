const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { createResturantController, getAllResturant } = require('../controllers/resturantController');

const router = express.Router()

//routes
//CREATE RESTAURANT || Post 
router.post('/create',authMiddleware,createResturantController)

// GET ALL RESTURANT || GET
router.get('/getAll',getAllResturant)

// GET ALL RESTURANT || GET
router.get('/get/:id')



module.exports=router;