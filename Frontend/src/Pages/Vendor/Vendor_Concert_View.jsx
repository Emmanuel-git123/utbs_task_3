import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Vendor_Concert_View = () => {
    const [concerts, setConcerts] = useState([]);
    const navigate = useNavigate();

    const fetchConcerts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/vendor/concerts", {
                method:"GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setConcerts(data.concerts);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching concerts:', error);
            toast.error('Error fetching concerts');
        }
    };

    useEffect(() => {
        fetchConcerts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this concert?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/vendor/concerts/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Concert deleted successfully");
                setConcerts((prev) => prev.filter((concert) => concert._id !== id));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting concert:", error);
            toast.error("Server error while deleting concert");
        }
    };

    const handleEdit = (id) => {
        navigate(`/vendor/concerts/edit/${id}`);
    };

    if (concerts.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Concerts</h1>
                <div className="text-center py-20 text-gray-600 text-xl">There are no Concerts Here...</div>
            </div>
        );
    }

    return (
        <div className='bg-gray-100 h-screen p-4'>
            <Toaster />
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Concerts</h1>
            <div className='grid grid-cols-3 gap-6'>
                {concerts.map((concert) => (
                    <div key={concert._id} className='bg-white rounded-xl shadow-md p-4'>
                        <h2 className='text-xl font-bold text-gray-800 mb-2'>{concert.name}</h2>
                        <div className="space-y-1">
                            {["artist", "location", "date", "time", "price", "category"].map((key) => (
                                <p key={key} className="text-sm text-gray-600">
                                    <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {concert[key]}
                                </p>
                            ))}
                        </div>
                        <div className='mt-4 flex gap-4'>
                            <button onClick={() => handleEdit(concert._id)} className="flex items-center gap-1 text-blue-500 hover:underline cursor-pointer">
                                <Pencil className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={() => handleDelete(concert._id)} className="flex items-center gap-1 text-red-500 hover:underline cursor-pointer">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vendor_Concert_View;
