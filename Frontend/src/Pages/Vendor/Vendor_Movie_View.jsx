import React, { useState, useEffect } from 'react'
import { Pencil, Trash2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Vendor_Movie_View = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const fetch_data = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/vendor/movies", {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setMovies(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Error fetching movies');
        }
    };

    useEffect(() => {
        fetch_data();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8080/api/vendor/movies/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Movie deleted successfully");
                setMovies((prev) => prev.filter((movie) => movie._id !== id));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
            toast.error("Server error while deleting movie");
        }
    };

    const handleEdit = (id) => {
        navigate(`/vendor/movies/edit/${id}`);
    };

    if (movies.length === 0) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Movies</h1>
                <div className="text-center py-20 text-gray-600 text-xl">There are no Movies Here...</div>
            </div>
        );
    }

    return (
        <div className='bg-gray-100 h-screen p-4'>
            <Toaster />
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">My Movies</h1>
            <div className='grid grid-cols-3 gap-6'>
                {movies.map((movie) => (
                    <div key={movie._id} className='bg-white rounded-xl shadow-md p-4'>
                        <h2 className='text-xl font-bold text-gray-800 mb-2'>{movie.Title}</h2>
                        <div className="space-y-1">
                            {["Genre", "Price", "Type", "Runtime", "Rated", "Released", "Plot", "imdbVotes", "imdbRating", "Language", "Country"]
                                .map((key) => (
                                    <p key={key} className="text-sm text-gray-600">
                                        <span className="font-semibold">{key}:</span> {movie[key]}
                                    </p>
                                ))}
                        </div>
                        <div className='mt-4 flex gap-4'>
                            <button onClick={() => handleEdit(movie._id)} className="flex items-center gap-1 text-blue-500 hover:underline">
                                <Pencil className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={() => handleDelete(movie._id)} className="flex items-center gap-1 text-red-500 hover:underline">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vendor_Movie_View;
