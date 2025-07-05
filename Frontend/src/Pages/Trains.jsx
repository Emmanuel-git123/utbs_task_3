import React, { useEffect, useState } from "react";
import { MousePointer2, MapPin, Calendar, Ticket } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Trains = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [tickets, setTickets] = useState("");
  const [allTrains, setAllTrains] = useState([]);
  const [availableFrom, setAvailableFrom] = useState([]);
  const [availableTo, setAvailableTo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/trains", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch trains");

        const data = await response.json();
        const trains = data.trains || [];
        setAllTrains(trains);

        const allSources = trains.map((t) => t.source);
        const uniqueSources = [...new Set(allSources)].sort();
        setAvailableFrom(uniqueSources);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load trains.");
      }
    };

    fetchTrains();
  }, []);

  const handleFromChange = (value) => {
    setFrom(value);
    setTo(""); 
    if (value) {
      const destinations = allTrains.filter((t) => t.source === value).map((t) => t.destination);
      setAvailableTo([...new Set(destinations)].sort());
    } else {
      setAvailableTo([]);
    }
  };

  const handleToChange = (value) => {
    setTo(value);
    if (value) {
      const sources = allTrains.filter((t) => t.destination === value).map((t) => t.source);
      setAvailableFrom([...new Set(sources)].sort());
    }
  };

  const handleSearch = () => {
    if (!from || !to || !date || !tickets) {
      toast.error("Please fill all fields.");
      return;
    }
    if (from === to) {
      toast.error("From and To destinations should be different");
      return;
    }

    navigate(`/trains/booking?from=${from}&to=${to}&date=${date}&tickets=${tickets}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <Toaster />
      <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-bold text-center text-blue-600 mb-6">Book Train Ticket</h1>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <MousePointer2 className="rotate-90 stroke-blue-600 w-4 h-4" />
            From
          </label>
          <select
            value={from}
            onChange={(e) => handleFromChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Source Station</option>
            {availableFrom.map((station, index) => (
              <option key={`from-${index}`} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <MapPin className="stroke-blue-600 w-4 h-4" />
            To
          </label>
          <select
            value={to}
            onChange={(e) => handleToChange(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            disabled={!from && availableTo.length === 0}
          >
            <option value="">Select Destination Station</option>
            {availableTo.map((station, index) => (
              <option key={`to-${index}`} value={station}>
                {station}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Calendar className="stroke-blue-600 w-4 h-4" />
            Date of Journey
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <Ticket className="stroke-blue-600 w-4 h-4" />
            No. of Tickets
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={tickets}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || (parseInt(val) >= 1 && parseInt(val) <= 20)) {
                setTickets(val);
              }
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">NOTE: You can only buy up to 20 tickets.</p>
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Search Trains
        </button>
      </div>
    </div>
  );
};

export default Trains;
