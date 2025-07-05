import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Vendor_Concert_Edit = () => {
    const { id } = useParams();
    const [concert, setConcert] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConcert = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/vendor/concerts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (res.ok) {
                if (result.concert.date) {
                    const parsedDate = new Date(result.concert.date);
                    const yyyy = parsedDate.getFullYear();
                    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
                    const dd = String(parsedDate.getDate()).padStart(2, '0');
                    result.concert.date = `${yyyy}-${mm}-${dd}`;
                }
                setConcert(result.concert);
            } else {
                toast.error("Failed to fetch concert details");
            }
        };
        fetchConcert();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConcert((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/vendor/concerts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(concert),
        });

        const result = await res.json();
        if (res.ok) {
            toast.success("Concert updated successfully");
            setTimeout(() => navigate("/vendor/dashboard"), 1000);
        } else {
            toast.error(result.message);
        }
    };

    if (!concert) return <div className="text-center py-10 text-gray-500">Loading...</div>;

    return (
        <div className='bg-gray-100 flex justify-center items-center w-full py-10'>
            <Toaster />
            <div className='flex flex-col w-3xl p-6 bg-white rounded-xl shadow-md'>
                <h1 className='text-blue-600 font-bold text-3xl mb-6'>Edit Concert</h1>
                <form>
                    <div className='flex flex-col'>
                        {[
                            { label: 'Concert Name', name: 'name', type: 'text' },
                            { label: 'Artist', name: 'artist', type: 'text' },
                            { label: 'Location', name: 'location', type: 'text' },
                            { label: 'Date', name: 'date', type: 'date' },
                            { label: 'Time', name: 'time', type: 'time' },
                            { label: 'Price', name: 'price', type: 'number' }
                        ].map(({ label, name, type }) => (
                            <div key={name} className="mb-4">
                                <label className='block text-sm font-medium text-gray-700'>{label}:</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={concert[name]}
                                    onChange={handleChange}
                                    className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Vendor_Concert_Edit;
