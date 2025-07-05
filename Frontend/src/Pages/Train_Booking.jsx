import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { TrainFront } from "lucide-react";

const Train_Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");
  const date = queryParams.get("date");
  const tickets = parseInt(queryParams.get("tickets"));

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8080/api/trains/search?source=${from}&destination=${to}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch trains");
        }

        setTrains(data.trains);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, [from, to]);

  const handleBookNow = (train) => {
    navigate("/confirmTrainBooking", {
      state: {
        train,
        date,
        tickets
      }
    });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10 px-4">
      <Toaster />
      <div className="w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-800 flex items-center justify-center gap-2">
          <TrainFront className="w-7 h-7 text-blue-700" /> Available Trains
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <p><span className="font-semibold text-gray-900">From:</span> {from}</p>
            <p><span className="font-semibold text-gray-900">To:</span> {to}</p>
            <p><span className="font-semibold text-gray-900">Date:</span> {date}</p>
            <p><span className="font-semibold text-gray-900">Tickets:</span> {tickets}</p>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading trains...</p>
        ) : trains.length === 0 ? (
          <p className="text-center text-red-600 font-medium">No trains found for the selected route.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2">
            {trains.map((train, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">
                     {train.trainName}: {train.trainNumber}
                  </h2>
                  <div className="text-gray-700 text-sm space-y-1">
                    <p><strong>Departure:</strong> {train.departureTime}</p>
                    <p><strong>Arrival:</strong> {train.arrivalTime}</p>
                    <p>
                      <strong>Price:</strong> ₹{train.price} x {tickets} ={" "}
                      <span className="font-semibold text-green-600">
                        ₹{train.price * tickets}
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleBookNow(train)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Train_Booking;
