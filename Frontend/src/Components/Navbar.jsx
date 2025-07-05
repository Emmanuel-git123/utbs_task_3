import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import utbs_logo from '../assets/UNIVERSAL-removebg-preview.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const navigate = useNavigate();

  const [isCheckingToken, setIsCheckingToken] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setFlag(false);
        setIsCheckingToken(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/user/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.ok) {
          const json = await response.json();
          setUser(json.user);
        }
        else if (response.status === 401 || response.status === 403) {
          toast.error("Session expired. Please log in again.");
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      catch (error) {
        console.error("Error fetching user:", error);
      }
      finally {
        setFlag(false);
        setIsCheckingToken(false);
      }
    };

    fetchUserDetails();
  }, [location.pathname]);

  if (isCheckingToken) return null;


  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <nav className='flex justify-around ' style={{ backgroundColor: "#216583 " }}>
        <Link to="/" className="flex items-center ">
          <img src={utbs_logo} alt="UTBS Logo" className="h-15 w-15" />
          <h1 className="text-white text-xl  font-bold tracking-wide mr-20">UTBS</h1>
        </Link>
        <div style={{ backgroundColor: "#216583" }} className="flex font-bold  p-2.5 gap-7  text-white rounded-3xl mr-15">
          <Link to="/" className="text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#65C0BA] hover:text-[#216583] hover:scale-105">Home</Link>
          <Link to="/movies" className="text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#65C0BA] hover:text-[#216583] hover:scale-105">Movies</Link>
          <Link to="/concerts" className="text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#65C0BA] hover:text-[#216583] hover:scale-105">Concerts</Link>
          <Link to="/trains" className="text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#65C0BA] hover:text-[#216583] hover:scale-105">Trains</Link>
          {user&&(user.role === "Vendor") &&
            <Link to="/vendor/dashboard" className='text-white px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-[#65C0BA] hover:text-[#216583] hover:scale-105'>Dashboard</Link>          
          }
        </div>
        <div className="flex p-2.5 gap-6">
          {flag ? null : (
            user ? (
              <>
                <Link onClick={handleLogout} className=" px-4 py-2 bg-red-400 text-amber-50 rounded-3xl font-semibold transition-all duration-300 ease-in-out hover:bg-red-500 hover:scale-110 hover:shadow-md">Logout</Link>
                <button className={`px-4 py-2 text-white rounded-3xl bg-indigo-400 font-semibold transition-all duration-300 ease-in-out hover:bg-indigo-500 hover:scale-110 hover:shadow-md hover:cursor-pointer`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false) }}>Dashboard</button>
                {(isHovered || isHovered2) &&
                  <div className="absolute right-0 top-11 mt-2 bg-white shadow-md rounded-md p-4 w-56 text-black" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => { setIsHovered2(false) }}>
                    {(user.role === "Vendor") &&
                      <Link  to="/vendor/dashboard" className='block hover:text-blue-600 w-full cursor-pointer text-lg font-semibold py-2 px-3 hover:bg-blue-100 hover:rounded-lg'>My Dashboard</Link>
                    }
                    <Link to="/myBookings" className="block hover:text-blue-600 w-full cursor-pointer text-lg font-semibold py-2 px-3 hover:bg-blue-100 hover:rounded-lg">My Bookings</Link>
                    <h1 className="hover:text-blue-600 w-full cursor-pointer text-lg font-semibold py-2 px-3 hover:bg-blue-100 hover:rounded-lg">Balance: ₹{user.balance}</h1>
                    <Link to="/profile" className="block hover:text-blue-600 w-full cursor-pointer text-lg font-semibold py-2 px-3 hover:bg-blue-100 hover:rounded-lg">Profile</Link>
                  </div>
                }
              </>
            ) : (
              <>
                <Link to="/login" className=" px-4 py-2 bg-red-400 text-amber-50 rounded-3xl font-semibold transition-all duration-300 ease-in-out hover:bg-red-500 hover:scale-110 hover:shadow-md">Login</Link>
                <Link to="/register" className=" px-4 py-2 text-white rounded-3xl bg-teal-400 font-semibold transition-all duration-300 ease-in-out hover:bg-teal-500 hover:scale-110 hover:shadow-md">Register</Link>
              </>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
