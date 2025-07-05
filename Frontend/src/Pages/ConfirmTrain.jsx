import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { TrainFront } from "lucide-react";

const ConfirmTrain = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(false);

  if (!state || !state.train || !state.date || !state.tickets) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Booking data is missing. Please go back and try again.
      </div>
    );
  }

  const { train, date, tickets } = state;
  const totalPrice = train.price * tickets;

  const handleConfirmBooking = async () => {
  setBooking(true);
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/trains/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        trainId: train._id,
        trainName: train.trainName,
        trainNumber: train.trainNumber,
        source: train.source,
        destination: train.destination,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        tickets,
        totalPrice,
        travelDate: date 
      }),
    });

    const result = await res.json();

    if (res.ok) {
      toast.success("Train booked successfully!");
      setTimeout(() => navigate("/"), 1500);
    } else {
      toast.error(result.message || "Booking failed.");
    }
  } catch (error) {
    console.error("Booking error:", error);
    toast.error("Something went wrong during booking.");
  } finally {
    setBooking(false);
  }
};


  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-10 px-4">
      <Toaster />
      <div className="w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center flex justify-center items-center gap-2">
          <TrainFront className="w-6 h-6 text-blue-600" />
          Confirm Train Booking
        </h1>

        <div className="space-y-4 text-gray-800 text-lg ">
          <p><strong> Train:</strong> {train.trainName} ({train.trainNumber})</p>
          <p><strong> From:</strong> {train.source}</p>
          <p><strong> To:</strong> {train.destination}</p>
          <p><strong> Departure:</strong> {train.departureTime}</p>
          <p><strong> Arrival:</strong> {train.arrivalTime}</p>
          <p><strong> Date:</strong> {date}</p>
          <p><strong> Tickets:</strong> {tickets}</p>
          <p>
            <strong> Total Price:</strong>{" "}
            <span className="text-green-600 font-semibold">₹{totalPrice}</span>
          </p>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={booking}
          className={`mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition ${
            booking ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {booking ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default ConfirmTrain;
