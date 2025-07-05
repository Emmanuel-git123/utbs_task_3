import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Vendor_Movie_Create = () => {
    const [data, setData] = useState({
        Title: "",
        Genre: "",
        Price: "",
        Type: "",
        Runtime: "",
        Rated: "",
        Released: "",
        Plot: "",
        imdbVotes: "",
        imdbRating: "",
        Language: "",
        Country: "",
    })

    const navigate = useNavigate();

    const handleChnage = (e) => {
        const { name, value } = e.target;
        setData(new_item => ({ ...new_item, [name]: value }))
    }

    const formatToDisplayDate = (inputDate) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(inputDate).toLocaleDateString('en-GB', options).replace(/ /g, ' ');
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...data,
            Released: formatToDisplayDate(data.Released)
        };
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:8080/api/vendor/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formattedData)
            })
            if (res.ok) {
                toast.success("Created Movie Successfully");
                setData({
                    Title: "",
                    Genre: "",
                    Price: "",
                    Type: "",
                    Runtime: "",
                    Rated: "",
                    Released: "",
                    Plot: "",
                    imdbVotes: "",
                    imdbRating: "",
                    Language: "",
                    Country: ""
                });
                setTimeout(() => {
                    navigate("/vendor/dashboard");
                }, 1000);
            }
            else {
                toast.error("Something went Wrong")
            }
        } catch (error) {
            console.error("Error creating movie:", error);
            alert("Something went wrong.");
        }
    }

    return (
        <div className='bg-gray-100 flex justify-center items-center w-full py-10'>
            <Toaster></Toaster>
            <div className='flex flex-col w-3xl p-6 bg-white rounded-xl shadow-md'>
                <h1 className='text-blue-600 font-bold text-3xl mb-6'>Create New Movie</h1>
                <form>
                    <div className='flex flex-col'>
                        {["Title", "Genre", "Price", "Type", "Runtime", "Rated", "Released", "Plot", "imdbVotes", "imdbRating", "Language", "Country"].map((item) => (
                            <div key={item} className="mb-4">
                                <label className='block text-sm font-medium text-gray-700'>{item}:</label>
                                {item === "Released" ? (
                                    <input type="date" name={item} value={data[item]} onChange={handleChnage} className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition' />
                                ) :
                                    item === "Rated" ? (
                                        <select name="Rated" value={data[item]} onChange={handleChnage} className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition' >
                                            <option value="">Select Rated</option>
                                            <option value="PG-13">PG-13</option>
                                            <option value="TV-14">TV-14</option>
                                        </select>
                                    ) : item === "Type" ? (
                                        <select name="Type" value={data[item]} onChange={handleChnage} className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition' >
                                            <option value="">Select Type</option>
                                            <option value="Movie">movie</option>
                                            <option value="Series">series</option>
                                        </select>
                                    ) : item === "Price" || item === "imdbRating" || item === "Runtime" || item === "imdbVotes" ? (
                                        < input value={data[item]} name={item} onChange={handleChnage} type="number" className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition' />
                                    ) : (

                                        <input value={data[item]} name={item} onChange={handleChnage} type="text" className='mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:outline-none focus:border-black hover:border-gray-700 transition' />
                                    )



                                }
                            </div>
                        ))}
                        <button onClick={handleClick} className='mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Vendor_Movie_Create