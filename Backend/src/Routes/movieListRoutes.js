const express=require('express');
const {getAllMovies,getMovieById,createMovies}=require("../Controllers/movieControllers")

const router=express.Router();

router.get("/",getAllMovies);
router.get("/:id",getMovieById);
router.post("/",createMovies);

module.exports=router;