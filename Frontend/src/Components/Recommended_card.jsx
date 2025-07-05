import React from 'react'
import { Link } from 'react-router-dom';


const Recommended_card = ({title:card_title,img,description,id}) => {
  return (
    <div>
        <Link to={`/movies/${id}`}>
      <div className='bg-white shadow-md p-1.5 hover:scale-110 duration-300 hover:shadow-sm w-fit rounded-lg hover:rotate-1'>

      <div className=' w-42 h-60 rounded-t-lg overflow-clip'>
        <img src={img} className='w-full h-full object-fill' alt="thumbnail" />
      </div>
      <h2 className='font-semibold text-sm'>{card_title}</h2>
      <h3 className='text-gray-500 text-xs'>{description}</h3>
      </div>
        </Link>
    </div>
  )
}

export default Recommended_card