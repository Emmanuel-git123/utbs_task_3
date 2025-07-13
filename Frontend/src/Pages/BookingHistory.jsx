import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { Clapperboard, Calendar, Clock, Globe, Ticket, Tag, Trash2, MapPin } from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [concertBookings, setConcertBookings] = useState([]);
  const [trainBookings, setTrainBookings] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/bookings/getBookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setBookings(data.bookings);
          setLoading(false);
        } else {
          toast.error(data.message || 'Failed to load movie bookings');
        }
      } catch (error) {
        console.error('Booking fetch error:', error);
        toast.error('Error fetching movie bookings');
      }
    };

    const fetchConcertBookings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/concertList/allConcertBookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setConcertBookings(data.concertBookings);
          setLoading(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Concert fetch error:', error);
        toast.error('Error fetching concert bookings');
      }
    };

    const fetchTrainBookings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/trains/showBookings', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setTrainBookings(data.trainBookings);
          setLoading(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error('Train fetch error:', error);
        toast.error('Error fetching train bookings');
      }
    };

    fetchBookings();
    fetchConcertBookings();
    fetchTrainBookings();
  }, []);

  const handleDelete = async (url, bookingId, setState) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(url + bookingId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Booking cancelled successfully");
        setState(prev => prev.filter(b => b._id !== bookingId));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Delete booking error:", err);
      toast.error("Server error");
    }
  };

  if(loading){
    return (
        <div>Loading...</div>
    )
  }

  return (
    <div className='flex items-center justify-center'>
      <div className="p-10 w-6xl bg-white h-fit flex flex-col ">
        <Toaster />
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600 tracking-tight flex items-center justify-center gap-2">
          <Clapperboard className='size-10' /> My Booking History
        </h1>

        {bookings.length === 0 && concertBookings.length === 0 && trainBookings.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">You have no bookings yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {bookings.length > 0 && (
              <>
                <h2 className="col-span-2 text-2xl font-semibold text-indigo-500">Movie Bookings</h2>
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className='flex justify-between items-center'>
                      <h2 className="text-2xl font-semibold text-green-700 mb-2">{booking.movie.Title}</h2>
                      <Trash2 onClick={() => handleDelete('http://localhost:8080/api/bookings/deleteBookings/', booking._id, setBookings)} className='stroke-red-500 cursor-pointer' />
                    </div>
                    <div className="space-y-1 text-gray-700 text-sm">
                      <p className='flex items-center gap-2'><Calendar /><span className="font-semibold">Date:</span> {booking.date}</p>
                      <p className='flex items-center gap-2'><Clock /><span className="font-semibold">Time:</span> {booking.time}</p>
                      <p className='flex items-center gap-2'><Globe /><span className="font-semibold">Language:</span> {booking.language}</p>
                      <p className='flex items-center gap-2'><Ticket /><span className="font-semibold">Format:</span> {booking.format}</p>
                      <p className='flex items-center gap-2'><Tag /><span className="font-semibold">Tickets:</span> {booking.tickets}</p>
                    </div>
                    <p className="mt-4 text-lg font-bold text-indigo-700">₹{booking.totalPrice} <span className="text-sm font-medium text-gray-500">Total Paid</span></p>
                  </div>
                ))}
              </>
            )}

            {concertBookings.length > 0 && (
              <>
                <h2 className="col-span-2 text-2xl font-semibold text-indigo-500 mt-6">Concert Bookings</h2>
                {concertBookings.map((booking) => (
                  <div key={booking._id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className='flex justify-between items-center'>
                      <h2 className="text-2xl font-semibold text-green-700 mb-2">{booking.concertName}</h2>
                      <Trash2 onClick={() => handleDelete('http://localhost:8080/api/concertList/', booking._id, setConcertBookings)} className='stroke-red-500 cursor-pointer' />
                    </div>
                    <div className="space-y-1 text-gray-700 text-sm">
                      <p className='flex items-center gap-2'><Calendar /><span className="font-semibold">Date:</span> {booking.date}</p>
                      <p className='flex items-center gap-2'><Clock /><span className="font-semibold">Time:</span> {booking.time}</p>
                      <p className='flex items-center gap-2'><MapPin /><span className="font-semibold">Location:</span> {booking.location}</p>
                      <p className='flex items-center gap-2'><Tag /><span className="font-semibold">Tickets:</span> {booking.tickets}</p>
                    </div>
                    <p className="mt-4 text-lg font-bold text-indigo-700">₹{booking.totalPrice} <span className="text-sm font-medium text-gray-500">Total Paid</span></p>
                  </div>
                ))}
              </>
            )}

            {trainBookings.length > 0 && (
              <>
                <h2 className="col-span-2 text-2xl font-semibold text-indigo-500 mt-6">Train Bookings</h2>
                {trainBookings.map((booking) => (
                  <div key={booking._id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className='flex justify-between items-center'>
                      <h2 className="text-2xl font-semibold text-green-700 mb-2">{booking.trainName} ({booking.trainNumber})</h2>
                      <Trash2 onClick={() => handleDelete('http://localhost:8080/api/trains/cancel/', booking._id, setTrainBookings)} className='stroke-red-500 cursor-pointer' />
                    </div>
                    <div className="space-y-1 text-gray-700 text-sm">
                      <p className='flex items-center gap-2'><MapPin /><span className="font-semibold">From:</span> {booking.source}</p>
                      <p className='flex items-center gap-2'><MapPin /><span className="font-semibold">To:</span> {booking.destination}</p>
                      <p className='flex items-center gap-2'><Calendar /><span className="font-semibold">Date:</span> {booking.travelDate}</p>
                      <p className='flex items-center gap-2'><Clock /><span className="font-semibold">Departure:</span> {booking.departureTime}</p>
                      <p className='flex items-center gap-2'><Clock /><span className="font-semibold">Arrival:</span> {booking.arrivalTime}</p>
                      <p className='flex items-center gap-2'><Tag /><span className="font-semibold">Tickets:</span> {booking.tickets}</p>
                    </div>
                    <p className="mt-4 text-lg font-bold text-indigo-700">₹{booking.totalPrice} <span className="text-sm font-medium text-gray-500">Total Paid</span></p>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
