const express=require('express')
const authMiddleware = require("../../middlewares/authMiddleware");

const {saveBookings,getBookings,deleteBookings} =require("../Controllers/bookingsController")

const router=express.Router();

router.post('/saveBookings',authMiddleware,saveBookings)
router.get('/getBookings',authMiddleware,getBookings)
router.delete('/deleteBookings/:id',authMiddleware,deleteBookings)

module.exports=router;