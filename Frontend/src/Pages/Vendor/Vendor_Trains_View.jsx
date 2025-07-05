import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Vendor_Trains_View = () => {
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();

    const fetchTrains = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/vendor/trains/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                setTrains(data.trains);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching trains:', error);
            toast.error('Error fetching trains');
        }
    };

    useEffect(() => {
        fetchTrains();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this train?')) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/vendor/trains/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Train deleted successfully');
                setTrains((prev) => prev.filter((train) => train._id !== id));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting train:', error);
            toast.error('Server error while deleting train');
        }
    };

    const handleEdit = (id) => {
        navigate(`/vendor/trains/edit/${id}`);
    };

    if (trains.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Trains</h1>
                <div className="text-center py-20 text-gray-600 text-xl">There are no Trains Here...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <Toaster />
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Trains</h1>
            <div className="grid grid-cols-3 gap-6">
                {trains.map((train) => (
                    <div key={train._id} className="bg-white rounded-xl shadow-md p-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">{train.trainName}</h2>
                        <div className="space-y-1">
                            {[
                                "trainNumber", "source", "destination", "departureTime", "arrivalTime", "price"
                            ].map((key) => (
                                <p key={key} className="text-sm text-gray-600">
                                    <span className="font-semibold">{key}:</span> {train[key]}
                                </p>
                            ))}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button onClick={() => handleEdit(train._id)} className="flex items-center gap-1 text-blue-500 hover:underline">
                                <Pencil className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={() => handleDelete(train._id)} className="flex items-center gap-1 text-red-500 hover:underline">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vendor_Trains_View;
