import React from 'react'
import { useEffect, useState } from 'react';
import {toast,Toaster} from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const ConfirmBooking = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const { id } = useParams();
    const query = new URLSearchParams(location.search);

    const language = query.get("language");
    const format = query.get("format");
    const date = query.get("date");
    const time = query.get("time");
    const tickets = parseInt(query.get("tickets"));

    const [movie, setMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetch_data = async () => {
            const response = await fetch(`http://localhost:8080/api/movielist/${id}`)
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMovie(data);
            }

            const userResponse = await fetch("http://localhost:8080/api/auth/user/profile", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user);
            } else {
                console.error("Failed to fetch user data.");
            }
        };
        fetch_data();
    }, [id]);

    const totalPrice = movie ? tickets * movie.Price : 1;

    const handleClick = async () => {
        if (!movie || !tickets || !language || !format || !date || !time) {
            toast.error("Booking data is incomplete.");
            return;
        }

        if (user.balance < totalPrice) {
            toast.error("Insufficient wallet balance.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/bookings/saveBookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    movieId: movie._id,
                    language,
                    format,
                    date,
                    time,
                    tickets,
                    totalPrice
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Booking confirmed!");
                setTimeout(() => {
                    navigate("/")
                }, 1000);
            } else {
                toast.error(data.message || "Booking failed.");
            }

        } catch (error) {
            console.error("Booking error:", error);
            toast.error("Something went wrong.");
        }
    };


    return (
        <div className='flex items-center justify-center'>
            <Toaster /> 
            <div className="w-md mt-10 p-6 bg-white rounded-xl shadow-lg h-md">
                {movie && (
                    <>
                        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
                            Booking Summary 🎟️
                        </h2>
                        <div className="space-y-2 flex flex-col text-gray-700">
                            <p><strong>Movie:</strong> {movie.Title}</p>
                            <p><strong>Language:</strong> {language}</p>
                            <p><strong>Format:</strong> {format}</p>
                            <p><strong>Date:</strong> {date}</p>
                            <p><strong>Time:</strong> {time}</p>
                            <p><strong>Tickets:</strong> {tickets}</p>
                            {user && (
                                <p><strong>Your Wallet Balance:</strong> ₹{user.balance}</p>
                            )}
                            {user && user.balance < totalPrice && (
                                <p className="text-red-500 text-sm font-medium">Insufficient Balance</p>
                            )}
                            <p className="text-lg font-semibold text-gray-900 border-t pt-2">
                                Total: ₹{totalPrice}
                            </p>
                            <button onClick={handleClick} className='block cursor-pointer text-center mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition'>Confirm Booking</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ConfirmBooking