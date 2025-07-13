import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import movie_img from "../assets/thumbnail_movie.jpg"
import { Star } from 'lucide-react';
import { Tag } from 'lucide-react';
import { X } from 'lucide-react';

const Movies_Details = () => {
    const [slots, setSlots] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [movie_details, setMovie_Details] = useState(null)
    const [selectedLanguage, setSelectedLanguage] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedFormat, setSelectedFormat] = useState(null)
    const [ticketCount,setTicketCount] = useState(null);
    const { id } = useParams();

    const getMovieById = async () => {
        const response = await fetch(`http://localhost:8080/api/movielist/${id}`);
        if (response.ok) {
            const json = await response.json();
            setMovie_Details(json);
            if (json.Language) {
                const language_array = json.Language.split(',').map((one_item) => one_item.trim())
                setLanguages(language_array);
            }
        }
        else {
            console.error("Failed To Fetch Data");
        }
    }

    useEffect(() => {
        getMovieById();
        setSlots(false);
    }, [])

    const handleClick = () => {
        setSlots(!slots);
    }

    return (
        <div className=' py-10 px-20 bg-sky-200'>
            <div className=' bg-amber-50 flex justify-start items-center py-3 px-7 shadow-md rounded-2xl '>
                <div className='flex w-full'>
                    {/* <div className=''>Poster</div> */}
                    <div className='w-84 mr-7 shadow-md rounded-lg'>
                        <img src={movie_img} alt="thumbnail" className='w-full h-full rounded-lg shadow-md' />
                    </div>
                    <div className=' w-full flex flex-col  gap-1'>
                        <h2 className='font-bold text-3xl'>{movie_details && movie_details.Title}</h2>
                        <div className=' flex items-cente font-light text-xs'>
                            <div className=' bg-yellow-50'>
                                {movie_details && movie_details.Country}  | {movie_details && movie_details.Language}
                            </div>
                        </div>
                        <div className='  w-full  flex py-3 justify-between items-center'>
                            <div className='flex gap-2 items-center'>
                                <div className='text-white bg-[#333333] py-1 rounded-lg px-3 font-semibold flex gap-1'>
                                    <Star />
                                    {movie_details && movie_details.imdbRating}/10
                                </div>
                                <div className='font-light'>
                                    ({movie_details && movie_details.imdbVotes} Votes)
                                </div>
                            </div>
                            <button className='font-semibold font-sans bg-gray-100 py-2 px-4 rounded-lg hover:bg-gray-200 duration-300 cursor-pointer'>Rate Now</button>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Genre:&nbsp;</p>
                            <div>{movie_details && movie_details.Genre}</div>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Type:&nbsp;</p>
                            <div>{movie_details && movie_details.Type}</div>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Runtime:&nbsp;</p>
                            <div>{movie_details && movie_details.Runtime}</div>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Rated:&nbsp;</p>
                            <div>{movie_details && movie_details.Rated}</div>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Released:&nbsp;</p>
                            <div>{movie_details && movie_details.Released}</div>
                        </div>
                        <div className='flex'>
                            <p className='font-semibold'>Plot:&nbsp;</p>
                            <div>{movie_details && movie_details.Plot}</div>
                        </div>
                        <button onClick={handleClick} className='bg-red-400 mt-14 w-fit flex gap-1 py-3 items-center px-13 rounded-lg text-white cursor-pointer hover:bg-red-500 duration-300 hover:scale-105'><Tag />Book Tickets</button>
                        {slots && (
                            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                                <div className="bg-white w-md rounded-xl shadow-xl p-6 h-fit">
                                    <div className="flex justify-between items-center mb-4">
                                        <h1 className="text-sm font-medium text-gray-700">{movie_details.Title}</h1>
                                        <button onClick={handleClick} className="text-xl p-1 rounded-2xl bg-gray-200 text-gray-600 hover:text-black transition cursor-pointer">
                                            <X className="size-5" />
                                        </button>
                                    </div>

                                    <h2 className="text-lg font-semibold mb-4">Select language and format</h2>

                                    {languages?.map((language) => (
                                        <div key={language} className="mb-4">
                                            <h3 className="bg-gray-200 text-sm font-semibold px-3 py-2 rounded-t">{language}</h3>
                                            <div className="flex justify-center gap-4 bg-white px-4 py-3 ">
                                                <button className={`border px-4 py-2 rounded-full transition hover:scale-105 cursor-pointer ${selectedFormat==="2D"&&selectedLanguage===language?"bg-red-500 text-white":"border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}`} onClick={()=>{setSelectedFormat("2D"); setSelectedLanguage(`${language}`)}} >2D</button>
                                                <button className={`border px-4 py-2 rounded-full transition hover:scale-105 cursor-pointer ${selectedFormat==="3D"&&selectedLanguage===language?"bg-red-500 text-white":"border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}`} onClick={()=>{setSelectedFormat("3D"); setSelectedLanguage(`${language}`)}} >3D</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex gap-1 flex-col mb-4'>
                                        <h1 className='font-semibold'>Select Date:</h1>
                                        <input type="date" value={selectedDate} onChange={(e)=>{setSelectedDate(e.target.value)}} min={new Date().toISOString().split('T')[0]} className='border w-full px-3 py-2 rounded-2xl' />
                                    </div>
                                    <div className='flex gap-1 flex-col mb-4'>
                                        <h1 className='font-semibold'>Select Time:</h1>
                                        <div className='flex justify-start gap-4  '>
                                            {["10:00 AM", "12:30 PM", "2:45 PM", "5:15 PM", "7:30 PM"].map((one_item) => (
                                                <button onClick={() => setSelectedTime(one_item)} className={`border px-2 rounded-2xl py-2 text-xs transition hover:scale-105 cursor-pointer ${selectedTime === one_item?"bg-red-500 text-white":"border-red-500 text-red-500 hover:bg-red-500 hover:text-white"}`}>{one_item}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <h1 className='font-semibold'>Number of Tickets:</h1>
                                        <input type="number" min={1} max={10} value={ticketCount} onChange={(e)=>{const value = Math.min(parseInt(e.target.value), 10);setTicketCount(value)}} className='border 2-full px-3 py-2 rounded-2xl'/>
                                        <p className='text-xs font-light text-gray-400'>NOTE : Max Limit is 10</p>
                                    </div>
                                    {selectedDate&&selectedFormat&&selectedLanguage&&selectedTime &&ticketCount&&(
                                        // <Link to={`/movies/${movie_details._id}/booking?language=${selectedLanguage}&format=${selectedFormat}&date=${selectedDate}&time=${selectedTime}`} className='block text-center mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition'>Continue to Booking</Link>
                                        <Link to={`/movies/${movie_details._id}/confirm?language=${selectedLanguage}&format=${selectedFormat}&date=${selectedDate}&time=${selectedTime}&tickets=${ticketCount}`} className='block text-center mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition'>Continue to Ticket Summary</Link>
                                    )
                                    }

                                    
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Movies_Details