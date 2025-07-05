import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Vendor_Trains_Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchTrain = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/vendor/trains/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();
            if (res.ok) {
                const train = result.train;
                setData(train);
            } else {
                toast.error("Failed to fetch train details");
            }
        };

        fetchTrain();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/vendor/trains/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        if (res.ok) {
            toast.success("Train updated successfully");
            setTimeout(() => navigate("/vendor/dashboard"), 1000);
        } else {
            toast.error(result.message);
        }
    };

    if (!data) return <div className="text-center py-10 text-gray-500">Loading...</div>;

    return (
        <div className="bg-gray-100 flex justify-center items-center w-full py-10">
            <Toaster />
            <div className="flex flex-col w-3xl p-6 bg-white rounded-xl shadow-md">
                <h1 className="text-blue-600 font-bold text-3xl mb-6">Edit Train</h1>
                <form>
                    <div className="flex flex-col">
                        {[
                            "trainName", "trainNumber", "source", "destination", "departureTime",
                            "arrivalTime", "price"
                        ].map((field) => (
                            <div key={field} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">{field}:</label>
                                <input
                                    type={
                                        field === "price" || field === "trainNumber"
                                            ? "number"
                                            : "text"
                                    }
                                    name={field}
                                    value={data[field]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Vendor_Trains_Edit;
