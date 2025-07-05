import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";

const UpdatePass = () => {
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const navigate=useNavigate();
    const location=useLocation();

    const {email,from}=location.state||{};

    const handleClick = async () => {
        if (newPass !== confirmPass) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/reset-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, newPass })
            })
            const json = await response.json();
            if (response.ok) {
                toast.success(json.message);
                if (from === "forgot_password") {
                    navigate("/login");
                } else if (from === "change_password") {
                    navigate("/profile");
                }
            }
            else {
                toast.error(json.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">New Password</label>
                    <input onChange={(e) => setNewPass(e.target.value)} value={newPass} type="text" id="newPassword" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <input onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} type="text" id="confirmPassword" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" />
                </div>

                <button onClick={handleClick} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Update</button>
            </form>
        </div>
    );
};

export default UpdatePass;
