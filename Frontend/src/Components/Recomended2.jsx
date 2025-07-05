import React from 'react';
import { Link } from 'react-router-dom';
import img_src from "../assets/thumnbail_concert_recomended.jpg"

const Recomended2 = ({ recomended_title, link, items }) => {
    return (
        <div className="py-10 bg-white w-full flex flex-col items-center">

            <div className="w-6xl px-4 flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-pink-600">{recomended_title}</h2>
                <Link to={link} className="text-blue-600 hover:underline font-medium text-sm">View All →</Link>
            </div>

            <div className="flex gap-6 flex-wrap justify-center w-full max-w-6xl px-4">
                {items && items.length > 0 ? (
                    items.map((concert) => (
                        <div key={concert._id} className="bg-pink-500 text-white p-4 rounded-xl shadow-lg w-64 hover:scale-105 transition">
                            <img src={img_src} alt={concert.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                            <h3 className="text-xl font-bold mb-1">{concert.name}</h3>
                            <p className="text-sm italic mb-2">{concert.artist}</p>
                            <p className="text-sm mb-1">{concert.location}</p>
                            <p className="text-sm mb-1">{concert.date} at {concert.time}</p>
                            <p className="text-sm font-semibold mb-2">₹ {concert.price}</p>
                            <Link to={`/concerts/${concert._id}`} className="inline-block bg-white text-pink-600 font-semibold px-3 py-1 rounded-full hover:bg-gray-100 transition">Book Now</Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No concerts available.</p>
                )}
            </div>
        </div>
    );
};

export default Recomended2;
