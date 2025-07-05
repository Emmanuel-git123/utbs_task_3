import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('');
    const [btnFlag, setBtnFlag] = useState(true);

    const navigate = useNavigate();

    // const callSuccess = () => {
    //     toast.success('Registration successful!!!');
    // }

    // const callError=()=>{
    //     toast.error("Try Again!!!")
    // }

    useEffect(() => {
        if (!name || !email || !password || !role || password.length < 6) {
            setBtnFlag(true);
        } else {
            setBtnFlag(false);
        }
    }, [name, email, password, role]);

    const handleClick = async (e) => {
        // alert("Registration successful!!!");
        // console.log(name,email,password,role);
        e.preventDefault();
        const result = await addUser({ name, email, password, role });
        if (result && result.success) {
            setName("")
            setEmail("")
            setPassword("")
            setRole("")
            // callSuccess();
            toast.success("Registered Successfully")
            setTimeout(() => {
                navigate("/login")
            }, 1000);
        }
    }

    const addUser = async (newUser) => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        if (response.status === 409) {
            toast.error("User already exists. Try logging in.");
            return { success: false };
        }

        if (response.ok) {
            const json = await response.json();
            return {
                success: true,
                data: json
            }
        } else {
            const error_response = await response.json();
            console.error("Failed to add user:", error_response.message);
            toast.error(error_response.message || "Something went wrong!");
            return { success: false, message: error_response.message };
        }
    } catch (error) {
        console.error("Error adding user:", error);
        toast.error("Server error. Please try again.");
        return { success: false };
    }
};




    return (
        <div className='flex flex-col justify-center items-center border min-h-screen'>
            <Toaster></Toaster>
            <div className='mb-10 items-center bg-white max-w-md rounded-2xl p-9 shadow-md w-full'>
                <h2 className='text-[#216583] font-bold text-center text-2xl mb-6'>Create Account</h2>

                <input
                    onChange={(e) => setName(e.target.value)}
                    className='border p-3 rounded-lg w-full mb-4 border-[#65C0BA] hover:bg-blue-50 hover:duration-300 ease-in-out focus:ring focus:ring-[#65C0BA] focus:outline-none shadow-md'
                    type="text"
                    placeholder='Full Name'
                    required
                />

                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 rounded-lg w-full mb-4 border-[#65C0BA] hover:bg-blue-50 hover:duration-300 ease-in-out focus:ring focus:ring-[#65C0BA] focus:outline-none shadow-md"
                    type="email"
                    placeholder='Email'
                    required
                />

                <input
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded-lg w-full mb-3 border-[#65C0BA] hover:bg-blue-50 hover:duration-300 ease-in-out focus:ring focus:ring-[#65C0BA] focus:outline-none shadow-md"
                    type="password"
                    placeholder='Password'
                    required
                />
                {/* {password.length > 0 && password.length < 6 && (<p className="text-red-500 text-sm mb-3">Password must be at least 6 characters long.</p>)} */}

                <div className='flex mb-2'>
                    <input
                        onClick={() => setRole("User")}
                        type="button"
                        className={`font-semibold border-2 border-cyan-600 text-cyan-900 p-1 w-full rounded-l hover:bg-cyan-200 hover:scale-105 duration-300 mr-0.5 shadow-md hover:cursor-pointer ${role === 'User' ? 'bg-cyan-200 scale-105' : 'bg-cyan-50'}`}
                        value={"User"}
                    />
                    <input
                        onClick={() => setRole("Vendor")}
                        type="button"
                        className={`font-semibold border-2 border-rose-600 p-1 w-full text-rose-900 rounded-r hover:bg-rose-200 hover:scale-105 duration-300 ml-0.5 shadow-md hover:cursor-pointer ${role === 'Vendor' ? 'bg-rose-200 scale-105' : 'bg-rose-50'}`}
                        value={"Vendor"}
                    />
                </div>
                {/* {!role && <p className='text-red-500 text-sm mb-3'>Select a Category.</p>} */}

                <button
                    onClick={handleClick}
                    // disabled={btnFlag}
                    className={`font-semibold py-2 w-full mb-4 rounded-lg text-white shadow-md bg-[#65C0BA] hover:bg-[#4aa3a1] hover:scale-105 duration-200 ease-in cursor-pointer`}
                >
                    Register
                </button>

                <p className='text-center text-[#216583] text-sm'>
                    Already have an account? <a href="/login" className='underline hover:text-[#F76262] font-semibold'>Login</a>
                </p>
            </div>
        </div>
    )
}

export default Register;
