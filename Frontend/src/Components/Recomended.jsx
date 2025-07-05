import React from 'react'
import Recommended_card from './Recommended_card'
import { Link } from 'react-router-dom'
import movie_img_1 from "../assets/thumbnail_movie.jpg"

const Recomended = ({recomended_title,link,items}) => {
    return (
        <div className=' hover:bg-cyan-100 flex flex-col items-center w-full overflow-x-hidden shadow-md hover:shadow-lg bg-white hover:scale-105 duration-500 '>
            <h2 className='font-bold text-3xl p-5'>Recomended {recomended_title}</h2>
            <div className='flex flex-col gap-10'>
                <div className='flex gap-10 mb-5'>
                    {/* <Recommended_card title="How to train your dragon" img={movie_img_1} description="Adventure/Family/Fantasy" />
                    <Recommended_card title="How to train your dragon" img={movie_img_1} description="Adventure/Family/Fantasy" />
                    <Recommended_card title="How to train your dragon" img={movie_img_1} description="Adventure/Family/Fantasy" />
                    <Recommended_card title="How to train your dragon" img={movie_img_1} description="Adventure/Family/Fantasy" /> */}
                {items&&items.map((item)=>(
                    <Recommended_card key={item._id} title={item.Title} img={movie_img_1} description={item.Genre} id={item._id} />     
                ))}
                </div>
            </div>
            <Link to={link} className='py-2.5 px-5  bg-amber-300 rounded-3xl font-semibold hover:bg-amber-400 duration-300 hover:scale-105 shadow-md hover:shadow-lg mb-7 hover:animate-pulse'>Show more</Link>
        </div>
    )
}

export default Recomended