import React from 'react'
import movie_img from "../assets/thumbnail_movie.jpg"
import Recommended_card from '../Components/Recommended_card'
import { useState,useEffect } from 'react'

const Movies = () => {
   const [movies, setMovie] = useState(null);
    useEffect(() => {
      const get_movies = async () => {
        const response = await fetch("http://localhost:8080/api/movielist/");
        const json = await response.json();
  
        if (response.ok) {
          setMovie(json);
        }
        else {
          console.error("Failed to fetch MOvies");
        }
      }
      get_movies();
    }, []);
  return (
    <div className='bg-amber-50 py-10 px-4'>
      <h1 className='mb-3 text-center text-4xl font-bold text-gray-800'>All Movies</h1>
      <hr />
    <div className='grid grid-cols-5 p-5 grid-flow-row gap-6 justify-items-center  w-full'>
      {movies&&movies.map((movie)=>(
        <Recommended_card key={movie._id} title={movie.Title} img={movie_img} description={movie.Genre} id={movie._id}></Recommended_card>
      ))}
    </div>
      </div>
  )
}

export default Movies