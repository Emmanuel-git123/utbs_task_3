import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';


const Profile = () => {
  const [mouse_flag, setMouse_Flag] = useState(true);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const get_user_data = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:8080/api/auth/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const json = await response.json();

        if (response.ok) {
          setUser(json.user);
          setName(json.user.name);
          setEmail(json.user.email);
          setProfilePic(json.user.profilePic);
        } else {
          console.error("Failed to fetch user profile", json.message);
          setUser(null);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    get_user_data();
  }, []);


  const handleBtnChange = (e) => {
    e.preventDefault();
    setMouse_Flag(!mouse_flag);
    setName(user.name);
    setEmail(user.email)
  }

  const handleSaveChanges = async () => {
    try {

      const response = await fetch("http://localhost:8080/api/auth/updateUserDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, profilePic })
      })
      const json = await response.json();
      if (response.ok) {
        setUser(json.user)
        setName(json.user.name)
        setEmail(json.user.email)
        setMouse_Flag(true);
        toast.success("Updated User Info Successfully");
      }
      else {
        toast.error(json.message || "Failed to update user info.");
      }
    } catch (error) {
      handleBtnChange();
      console.error("Error updating user info:", error);
      toast.error("Something went wrong while updating. Please try again.");
    }
  }

  return (
    <div className='flex justify-center px-4 bg-gray-100'>
      <div className='w-md flex flex-col bg-white p-8 m-10 my-20 rounded-lg shadow-md'>
        <div className='flex flex-col items-center'>
          <div className='w-24 h-24 rounded-full overflow-hidden shadow border bg-white'>
            {profilePic ? (
              <img src={profilePic} alt="Profile" className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full flex justify-center items-center bg-gray-200'>
                <User className='size-14 stroke-gray-600' />
              </div>
            )}
          </div>
          {name && <h1 className='font-bold text-2xl text-gray-800 mb-1'>{user.name}</h1>}
          {user && <p className='text-gray-500 capitalize'>{user.role}</p>}
        </div>
        <div className=' mt-6'>
          <form className='flex flex-col'>
            <label className='font-semibold text-gray-600 p-0.5'>Name</label>
            {user && <input disabled={mouse_flag} className={`border border-gray-300 py-1 rounded px-3 ${mouse_flag ? 'cursor-not-allowed' : ''}`} value={name} onChange={(e) => setName(e.target.value)} type="text" />}

            <label className='font-semibold text-gray-600 p-0.5'>Email</label>
            {user && <input disabled={mouse_flag} className={`border border-gray-300 py-1 rounded px-3 ${mouse_flag ? 'cursor-not-allowed' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} type="text" />}

            <label className='font-semibold text-gray-600 p-0.5'>Profile Picture</label>
            {!mouse_flag && (
              <input
                type="file"
                accept="image/*"
                className='text-sm text-gray-500 mt-1 border border-gray-300 py-1 rounded px-3'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setProfilePic(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            )}

            <div className='flex gap-2'>
              <button onClick={handleBtnChange} className='bg-yellow-500 text-white w-fit px-4 py-2 rounded-lg mt-6 cursor-pointer'>{mouse_flag ? "Edit" : "Cancel"}</button>
              {!mouse_flag &&
                <div onClick={handleSaveChanges} className='bg-yellow-500 text-white w-fit px-4 py-2 rounded-lg mt-6 cursor-pointer'>Save Changes</div>
              }
            </div>
          </form>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <Link to={"/changePassword"} className='mt-4 text-sm text-blue-600 hover:underline text-center' >Change Password</Link>
          <Link to={"/myBookings"} className='px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition w-fit'>View your Bookings</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile