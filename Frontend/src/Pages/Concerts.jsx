import React, { useEffect, useState } from 'react'
import { Clock } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  useEffect(() => {
    const fetch_concerts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/concertList/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          }
        });
        const data = await response.json();
        if (response.ok) {
          setConcerts(data);
        } else {
          console.error('Failed to fetch concerts:', data.message);
        }
      }
      catch (error) {
        console.error('Error fetching concerts:', error);
      };
    }
    fetch_concerts();
  }, [])

  const format_time = (input) => {
    const [hour, min] = input.split(":");
    const hour_int = parseInt(hour);
    let am_pm;
    if (hour_int >= 12) {
      am_pm = "PM";
    }
    else {
      am_pm = "AM";
    }
    const time_12 = hour_int % 12 === 0 ? 12 : hour_int % 12;
    return `${time_12}:${min} ${am_pm}`
  }

  const getMonthDay = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    return { month, day };
  };

  return (
    <div className='flex flex-col gap-7 items-center justify-center border bg-blue-200 p-10 '>
      {concerts && concerts.map((concert) => {
        const { month, day } = getMonthDay(concert.date);
        return (
          <div key={concert._id} className=' w-6xl flex bg-white px-5 rounded-lg shadow hover:shadow-md transition duration-300'>
            <div className=' flex flex-col items-center justify-center py-3 px-7'>
              <h1 className='font-medium text-gray-400'>{month}</h1>
              <p className='font-bold text-3xl text-blue-700'>{day}</p>
            </div>
            <div className='py-5 w-full'>
              <div className='flex items-center justify-start gap-1 text-gray-700'>
                <Clock className='size-5' />
                <h1>{format_time(concert.time)}</h1>
              </div>
              <h1 className='text-2xl font-semibold'>{concert.name}</h1>
              <h1 className='text-gray-500 mb-1'>{concert.artist}</h1>
              <div className='flex items-center justify-start text-gray-700'>
                <MapPin className='size-5' />
                <h1>{concert.location}</h1>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <Link to={`/concerts/${concert._id}`} className='bg-indigo-600 cursor-pointer text-white text-xs font-medium px-5 py-2 hover:bg-indigo-700 transition flex justify-center items-center rounded-xl shadow-sm'>Book Tickets<MoveRight /></Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Concerts