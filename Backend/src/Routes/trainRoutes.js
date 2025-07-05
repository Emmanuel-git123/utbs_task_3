const express=require('express');
const router=express.Router();

const authMiddleware=require("../../middlewares/authMiddleware")

const {getTrains,getAllBookedTrains,bookTrain, getSearchedTrains,cancelTrainBooking}=require("../Controllers/trainControllers")

router.get("/",getTrains);
router.get("/search",authMiddleware,getSearchedTrains);
router.post("/book", authMiddleware, bookTrain);
router.get("/showBookings", authMiddleware, getAllBookedTrains);
router.delete("/cancel/:id", authMiddleware, cancelTrainBooking);

module.exports=router