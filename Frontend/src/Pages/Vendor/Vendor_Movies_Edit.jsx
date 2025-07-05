import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Vendor_Movie_Edit = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/vendor/movies/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            if (res.ok) {
                const movie = result.movie;
                if (movie.Released) {
                    const parsedDate = new Date(movie.Released);
                    const yyyy = parsedDate.getFullYear();
                    const mm = String(parsedDate.getMonth() + 1).padStart(2, '0');
                    const dd = String(parsedDate.getDate()).padStart(2, '0');
                    movie.Released = `${yyyy}-${mm}-${dd}`;
                }
                setData(result.movie);
            } else {
                toast.error("Failed to fetch movie details");
            }
        };
        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8080/api/vendor/movies/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok) {
            toast.success("Movie updated successfully");
            setTimeout(() => navigate("/vendor/dashboard"), 1000);
        } else {
            toast.error(result.message);
        }
    };

    if (!data) return <div className="text-center py-10 text-gray-500">Loading...</div>;

    return (
        <div className='bg-gray-100 flex justify-center items-center w-full py-10'>
            <Toaster />
            <div className='flex flex-col w-3xl p-6 bg-white rounded-xl shadow-md'>
                <h1 className='text-blue-600 font-bold text-3xl mb-6'>Edit Movie</h1>
                <form>
                    <div className='flex flex-col'>
                        {["Title", "Genre", "Price", "Type", "Runtime", "Rated", "Released", "Plot", "imdbVotes", "imdbRating", "Language", "Country"].map((item) => {
                            if (item === "Released") {
                                return (
                                    <div key={item} className="mb-4">
                                        <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                        <input
                                            type="date"
                                            name={item}
                                            value={data[item]}
                                            onChange={handleChange}
                                            className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                        />
                                    </div>
                                );
                            } else {
                                if (item === "Rated") {
                                    return (
                                        <div key={item} className="mb-4">
                                            <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                            <select
                                                name={item}
                                                value={data[item]}
                                                onChange={handleChange}
                                                className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                            >
                                                <option value="">Select Rated</option>
                                                <option value="PG-13">PG-13</option>
                                                <option value="TV-14">TV-14</option>
                                            </select>
                                        </div>
                                    );
                                } else {
                                    if (item === "Type") {
                                        return (
                                            <div key={item} className="mb-4">
                                                <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                                <select
                                                    name={item}
                                                    value={data[item]}
                                                    onChange={handleChange}
                                                    className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                                >
                                                    <option value="">Select Type</option>
                                                    <option value="Movie">movie</option>
                                                    <option value="Series">series</option>
                                                </select>
                                            </div>
                                        );
                                    } else {
                                        if (["Price", "imdbRating", "Runtime", "imdbVotes"].includes(item)) {
                                            return (
                                                <div key={item} className="mb-4">
                                                    <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                                    <input
                                                        type="number"
                                                        name={item}
                                                        value={data[item]}
                                                        onChange={handleChange}
                                                        className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                                    />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={item} className="mb-4">
                                                    <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                                    <input
                                                        type="text"
                                                        name={item}
                                                        value={data[item]}
                                                        onChange={handleChange}
                                                        className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition'
                                                    />
                                                </div>
                                            );
                                        }
                                    }
                                }
                            }
                        })}
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

export default Vendor_Movie_Edit;
