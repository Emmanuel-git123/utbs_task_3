import React from 'react'
import Card from '../Components/Card'
import { Link } from 'react-router-dom'
import Recomended from '../Components/Recomended'
import Movies from './Movies'
import { useState } from 'react'
import { useEffect } from 'react'
import Recomended2 from '../Components/Recomended2'

const Home = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovie] = useState(null);
  const [concerts, setConcerts] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/api/auth/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const json = await response.json();
          setUser(json.user);
        } else if (response.status === 401 || response.status === 403) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          console.warn("Unexpected error fetching profile:", response.status);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
      }
    };

    const getMovies = async () => {
      const response = await fetch("http://localhost:8080/api/movielist/");
      const json = await response.json();
      if (response.ok) setMovie(json);
      else console.error("Failed to fetch movies");
    };
    const getConcerts = async () => {
      const response = await fetch("http://localhost:8080/api/concertList/");
      const json = await response.json();
      if (response.ok) setConcerts(json);
    };

    fetchUser();
    getMovies();
    getConcerts();
  }, []);


  return (
    <div className='w-full overflow-hidden '>
      <div className=' bg-[#216583] text-white flex flex-col items-center py-20'>
        <h1 className='text-5xl font-bold'>{user ? `Welcome Back, ${user.name}` : "Welcome to UTBS"}</h1>
        <p className='text-lg w-lg text-center my-2'>Book your movie, concert, and train tickets - all in one place, instantly and securly. </p>
        {user ?
          (
            user.role === "Vendor" ?
              <Link to="/vendor/dashboard" className='bg-rose-500 py-3 px-5 rounded-3xl hover:bg-rose-600 duration-300 hover:scale-105 font-semibold '>Go to Dashboard</Link>
              :
              <Link to="/profile" className='bg-rose-500 py-3 px-5 rounded-3xl hover:bg-rose-600 duration-300 hover:scale-105 font-semibold '>Go to Profile</Link>

          )
          :
          <Link to="/register" className='bg-rose-500 py-3 px-5 rounded-3xl hover:bg-rose-600 duration-300 hover:scale-105 font-semibold '>Get Started</Link>
        }      </div>
      <div className='flex flex-col items-center py-10 bg-[#F6F8FA]'>
        <h2 className='font-bold text-3xl mb-5'>What can you Book?</h2>
        <div className='flex gap-20'>
          <Card title="Movies" description="Find the latest blockbusters and book your movie tickets now!" link="/movies"></Card>
          <Card title="Concerts" description="Experience live music events and performances in your city" link="/concerts"></Card>
          <Card title="Trains" description="Book your train tickets easily and travel across India!" link="/trains"></Card>
        </div>
      </div>
      <Recomended recomended_title="Movies" link="/movies" items={movies ? movies.slice(0, 4) : []}></Recomended>
      <Recomended2 recomended_title="Concerts" link="/concerts" items={concerts ? concerts.slice(0, 4) : []}></Recomended2>
      {/* <Recomended3 recomended_title="Trains" link="/trains" items={trains ? trains.slice(0, 4) : []}></Recomended3> */}
      {/* <Recomended recomended_title="Concerts" link="/concerts"></Recomended>
      <Recomended recomended_title="Trains" link="/trains"></Recomended> */}
      <div className="flex justify-center items-center py-10 bg-[#F6F8FA]">
        <Link to="/trains" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition">Go to Trains Section</Link>
      </div>

    </div>
  )
}

export default Home