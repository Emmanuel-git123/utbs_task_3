import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({title,description,link}) => {
  return (
    <div className='p-10 w-72 bg-white shadow-md flex flex-col justify-center hover:scale-105 hover:shadow-xl transition  duration-300 hover:border-[#65C0BA] border-2 border-transparent hover:-rotate-6 rounded-2xl'>
        <h2 className='font-semibold text-2xl text-center'>{title}</h2>
        <p className='my-5 text-sm text-gray-600 text-center w-fit '>{description}</p>
        <Link to={link} className='text-center font-medium hover:underline text-[#3d6b82] '>Explore</Link>
    </div>
  )
}

export default Card