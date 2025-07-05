import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Vendor_Trains_Create = () => {
    const [data, setData] = useState({
        trainName: '',
        trainNumber: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        price: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:8080/api/vendor/trains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                toast.success('Train Created Successfully!');
                setData({
                    trainName: '',
                    trainNumber: '',
                    source: '',
                    destination: '',
                    departureTime: '',
                    arrivalTime: '',
                    price: ''
                });

                setTimeout(() => navigate('/vendor/dashboard'), 1000);
            } else {
                toast.error(result.message || 'Failed to create train');
            }
        } catch (error) {
            console.error('Error creating train:', error);
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className='bg-gray-100 flex justify-center items-center w-full py-10'>
            <Toaster />
            <div className='flex flex-col w-3xl p-6 bg-white rounded-xl shadow-md'>
                <h1 className='text-blue-600 font-bold text-3xl mb-6'>Create New Train</h1>
                <form>
                    <div className='flex flex-col'>
                        {[
                            { label: 'Train Name', name: 'trainName', type: 'text' },
                            { label: 'Train Number', name: 'trainNumber', type: 'number' },
                            { label: 'Source Station', name: 'source', type: 'text' },
                            { label: 'Destination Station', name: 'destination', type: 'text' },
                            { label: 'Departure Time (e.g. 06:30)', name: 'departureTime', type: 'text' },
                            { label: 'Arrival Time (e.g. 13:45)', name: 'arrivalTime', type: 'text' },
                            { label: 'Ticket Price', name: 'price', type: 'number' }
                        ].map(({ label, name, type }) => (
                            <div key={name} className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>{label}:</label>
                                <input
                                    name={name}
                                    type={type}
                                    value={data[name]}
                                    onChange={handleChange}
                                    className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                    required
                                />
                            </div>
                        ))}
                        <button
                            onClick={handleSubmit}
                            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Vendor_Trains_Create;
