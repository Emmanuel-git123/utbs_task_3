const {Movie}=require("../../models/Movie.js")
const getAllMovies=async(req,res)=>{
    // res.json({message:"Got all the movies successfully"})   
    try {
        const all_movies=await Movie.find()
        res.json(all_movies);
    } catch (error) {
        console.error("Error in the getAllMovies function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getMovieById= async (req,res)=>{
    // res.json({message:"created movies successfully"})
    try {
        const selected_movie=await Movie.findById(req.params.id);
        if(!selected_movie){
            return res.status(404).json({message:"Movie not found"})
        }
        res.json(selected_movie);
    } catch (error) {
        console.error("Error in the getMovieById function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const createMovies= async(req,res)=>{
    // res.json({message:"created movies successfully"})
    try {
        const submitted_movie=req.body;
        const new_movie=new Movie(submitted_movie);
        await new_movie.save();
        res.status(201).json({ message: "Movie successfully created", movie: new_movie });
    } catch (error) {
        console.error("Error in the createMovies function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports={
    getAllMovies,
    getMovieById,
    createMovies
}