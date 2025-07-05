import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
    const [user_input, setUser_Input] = useState("");
    const [otpFlag, setOtpFlag] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();


    const handleClick = async (e) => {
        e.preventDefault();
        const result = await post_data(user_input);
        if (result && result.success) {
            toast.success(result.data.message);
            setOtpFlag(true);
        }
        else {
            toast.error(result.message);
        }
    }

    const handleOtpChange = async (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const updatedOtp = [...otp];
            updatedOtp[index] = value;
            setOtp(updatedOtp);
        }
    }

    const handleOtpVerify = async () => {
        const entered_otp = otp.join("");
        if (entered_otp.length < 6) {
            toast.error("Please enter complete 6-digit OTP");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/otpVerify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: user_input, otp: entered_otp })
            })

            const json = await response.json();

            if (response.ok) {
                toast.success(json.message);
                navigate("/updatePassword", {
                    state: {
                        email: user_input,
                        from: "forgot_password" // this lets us know what process started this
                    }
                });
            }
            else {
                toast.error(json.message);
            }

        } catch (error) {
            console.error("Error in otp verification:", error.message);
            toast.error("Something went wrong");
        }
    }

    const post_data = async (user_input) => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/forgotPass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: user_input })
            })
            const json = await response.json();
            if (response.ok) {
                return {
                    success: true,
                    data: json
                }
            } else {
                return {
                    success: false,
                    message: json.message
                };
            }
        }
        catch (error) {
            console.error("Failed to send otp:", error.message);
            return { success: false, message: error.message };
        }
    }
    return (
        <div className='bg-blue-100 flex justify-center items-center p-20'>
            <Toaster></Toaster>
            <div className='bg-white w-md aspect-square flex justify-center items-center flex-col '>
                <h1 className='border font-bold text-4xl shadow p-2 '>Enter Your Email</h1>
                <input value={user_input} onChange={(e) => setUser_Input(e.target.value)} type="text" className='w-3xs p-2 my-5 focus:outline-none focus:ring focus:ring-blue-500' placeholder='example@gmail.com' />
                <button onClick={handleClick} className='border py-2 px-5 bg-amber-300 shadow rounded-full hover:bg-amber-400 cursor-pointer transition '>Send OTP</button>
            </div>
            {otpFlag &&
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white border rounded-lg p-10 shadow-lg flex flex-col items-center">
                        <h2 className="text-2xl font-semibold mb-6">Enter OTP</h2>
                        <div className="flex space-x-3 mb-6">
                            {otp.map((digit, index) => (
                                <input key={index} onChange={(e) => handleOtpChange(e, index)} value={digit} type="text" maxLength={1} inputMode='numeric' className="w-12 h-12 text-center border border-gray-400 rounded text-xl focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            ))}
                        </div>
                        <button onClick={handleOtpVerify} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Verify OTP</button>
                    </div>
                </div>
            }

        </div>
    )
}
export default ForgotPass