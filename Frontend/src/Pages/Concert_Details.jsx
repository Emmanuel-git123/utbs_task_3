import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import img_concert from '../assets/thumnbail_concert.jpg'; 
import toast from 'react-hot-toast';
import { MoveRight } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const Concert_Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [concert, setConcert] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cost, setCost] = useState(null)
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        const fetchConcert = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/concertList/${id}`,{
                    method:"GET",
                    headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const data = await response.json();
                if (response.ok) {
                    setConcert(data);
                } else {
                    console.error('Concert not found:', data.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching concert:', error);
                setLoading(false);
            }
        };
        fetchConcert();
    }, [id]);

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

    const formatDate = (iso) => {
        const date = new Date(iso);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleClick = () => {
        setPopup(!popup);
    }

    const handleSumbit=async()=>{
        try {
            const response=await fetch(`http://localhost:8080/api/concertList/${id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({concertId:concert._id,concertName:concert.name,artist:concert.artist,date:concert.date,time:concert.time,location:concert.location,tickets:cost,totalPrice:concert.price*cost})
            })
            const json=await response.json();
            if(response.ok){
                toast.success("Successfully Booked");
                handleClick();
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
            else{
                toast.error(json.message);
            }
        } catch (error) {
            console.error("Error while purchasing concert: ",error);
        }
    }

    if (loading)
        return <div className="text-center mt-12 text-gray-500 text-lg">Loading concert details...</div>;

    return (
        <div className="w-5xl my-10 mx-auto p-6 hover:shadow-md bg-white rounded-xl shadow mt-12 transition-all duration-300">
            <Toaster />
            <div className="w-full h-90 mb-8 overflow-hidden rounded-lg">
                <img
                    src={img_concert}
                    alt={concert.name}
                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">{concert.name}</h1>
            <p className="text-xl text-gray-500 mb-4">{concert.artist}</p>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-md">{format_time(concert.time)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-md">{concert.location}</span>
                </div>
                <div className="text-md">
                    Scheduled on: <strong>{formatDate(concert.date)}</strong>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-4 mt-8">
                <div className='flex items-start gap-3 justify-center'>
                    <div className='flex flex-col items-start justify-center '>
                        <div className='flex gap-2 items-center justify-center'>
                            <label>No.of Tickets:</label>
                            <input type="number" value={cost} onChange={(e) => { if (e.target.value === "") { setCost(""); return; } if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 20) setCost(e.target.value); }} className='border' />
                        </div>
                        <div>
                            <p className='text-xs font-light text-gray-400'>NOTE: You can only book upto 20 Tickets...</p>
                        </div>
                    </div>
                    <span className="text-2xl -translate-1 font-semibold text-indigo-700">₹{concert.price * cost}</span>
                </div>
                {cost && <button onClick={handleClick} className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white px-6 py-3 rounded-md font-medium shadow-md flex items-center gap-1 justify-center cursor-pointer">
                    Book Now <MoveRight className='flex mt-1' />
                </button>}

                {popup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
                        <div className="bg-white rounded-xl shadow-xl p-6 w-[430px]">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Your Booking</h2>

                            <div className="text-sm text-gray-700 mb-2">
                                <p><strong>Concert:</strong> {concert.name}</p>
                                <p><strong>Artist:</strong> {concert.artist}</p>
                                <p><strong>Date:</strong> {formatDate(concert.date)}</p>
                                <p><strong>Time:</strong> {format_time(concert.time)}</p>
                                <p><strong>Location:</strong> {concert.location}</p>
                                <p><strong>No. of Tickets:</strong> {cost}</p>
                                <p className="text-lg font-medium text-indigo-700 mt-2">Total Price: ₹{concert.price * cost}</p>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button onClick={handleClick} className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer">Cancel</button>
                                <button onClick={handleSumbit} className="px-4 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer">Confirm</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Concert_Details;
