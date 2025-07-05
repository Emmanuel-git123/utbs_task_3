const express=require('express');
const {getAllConcerts,getConcertById,createConcerts,buyConcert,getAllBookedConcerts,deleteConcert}=require("../Controllers/concertController")
const authMiddleware = require("../../middlewares/authMiddleware");

const router=express.Router();

router.get("/",getAllConcerts);
router.post("/",authMiddleware,createConcerts);

router.get("/allConcertBookings",authMiddleware,getAllBookedConcerts);

router.get("/:id",authMiddleware,getConcertById);
router.post("/:id",authMiddleware,buyConcert);
router.delete("/:id", authMiddleware, deleteConcert);

module.exports=router;