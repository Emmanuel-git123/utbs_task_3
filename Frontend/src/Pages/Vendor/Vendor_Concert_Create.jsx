import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Vendor_Concert_Create = () => {
    const [concert, setConcert] = useState({
        name: '',
        artist: '',
        location: '',
        date: '',
        time: '',
        price: '',
    });
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConcert((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:8080/api/vendor/concerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(concert),
            });

            if (res.ok) {
                toast.success('Concert created successfully!');
                setConcert({
                    name: '',
                    artist: '',
                    location: '',
                    date: '',
                    time: '',
                    price: '',
                });
                setTimeout(() => {
                    navigate("/vendor/dashboard");
                }, 1000);
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to create concert');
            }
        } catch (error) {
            console.error(error);
            toast.error('Server error');
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen py-10">
            <Toaster />
            <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Create Concert</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                        { label: 'Concert Name', name: 'name', type:'text' },
                        { label: 'Artist', name: 'artist', type:'text' },
                        { label: 'Location', name: 'location', type:'text' },
                        { label: 'Date', name: 'date', type: 'date' },
                        { label: 'Time', name: 'time', type: 'time' },
                        { label: 'Price', name: 'price', type: 'number' },
                    ].map(({ label, name, type}) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={concert[name]}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Vendor_Concert_Create;
