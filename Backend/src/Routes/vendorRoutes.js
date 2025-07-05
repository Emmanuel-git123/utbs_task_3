const express=require('express');
const authMiddleware = require('../../middlewares/authMiddleware');
const { isVendor } = require('../../middlewares/vendorMiddleware');
const {createMovies,showMovies,updateMovie,deleteMovie,showSelectedMovie,createConcerts,showConcerts,deleteConcert,showSelectedConcerts,updateConcert,createTrains,showTrains,showSelectedTrain,updateTrain,deleteTrain, searchTrains}=require('../Controllers/vendorController')
const router=express.Router();

router.post("/movies",authMiddleware,isVendor,createMovies)
router.get("/movies",authMiddleware,isVendor,showMovies)
router.get("/movies/:id",authMiddleware,isVendor,showSelectedMovie)
router.put("/movies/:id",authMiddleware,isVendor,updateMovie)
router.delete("/movies/:id",authMiddleware,isVendor,deleteMovie)

router.post("/concerts",authMiddleware,isVendor,createConcerts)
router.get("/concerts",authMiddleware,isVendor,showConcerts)
router.get("/concerts/:id",authMiddleware,isVendor,showSelectedConcerts)
router.put("/concerts/:id",authMiddleware,isVendor,updateConcert)
router.delete("/concerts/:id",authMiddleware,isVendor,deleteConcert)

router.post("/trains",authMiddleware,isVendor,createTrains)
router.get("/trains",authMiddleware,isVendor,showTrains)
router.get("/trains/:id",authMiddleware,isVendor,showSelectedTrain)
router.put("/trains/:id",authMiddleware,isVendor,updateTrain)
router.delete("/trains/:id",authMiddleware,isVendor,deleteTrain)
router.get("/trains/search",authMiddleware, searchTrains);


module.exports=router;
