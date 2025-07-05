import React from 'react'
import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CirclePlus } from 'lucide-react';
import { Film } from 'lucide-react';

const Vendor_Dashboard = () => {
    return (
        <div className='flex justify-center items-center bg-gray-100 p-4'>
            <div className='w-lg flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow hover:shadow-md'>
                <div className='flex items-center gap-3 mb-4'>
                    <LayoutDashboard className='stroke-blue-600 w-6 h-6' />
                    <h1 className='text-blue-600 font-bold text-2xl'>Vendor Dashboard</h1>
                </div>
                <div className='w-full flex flex-col gap-10'>
                    <div className='flex flex-col w-full gap-4'>
                        <h1 className='text-xl font-semibold text-red-500'>Movies</h1>
                        <div>
                            <Link to="/vendor/movies/create" className='flex items-center gap-3 text-white bg-blue-500 rounded-lg py-3 px-4 shadow  hover:bg-blue-600 hover:shadow-md transition'>
                                <CirclePlus className='w-5 h-5' />
                                <p>Create New Movie</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/vendor/movies/view" className='flex items-center gap-3 text-white bg-green-500 rounded-lg py-3 px-4 shadow  hover:bg-green-600 hover:shadow-md transition'>
                                <Film className='w-5 h-5' />
                                <p>View My Movies</p>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <h1 className='text-xl font-semibold text-red-500'>Concerts</h1>
                        <div>
                            <Link to="/vendor/concerts/create" className='flex items-center gap-3 text-white bg-blue-500 rounded-lg py-3 px-4 shadow  hover:bg-blue-600 hover:shadow-md transition'>
                                <CirclePlus className='w-5 h-5' />
                                <p>Create New Concert</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/vendor/concerts/view" className='flex items-center gap-3 text-white bg-green-500 rounded-lg py-3 px-4 shadow  hover:bg-green-600 hover:shadow-md transition'>
                                <Film className='w-5 h-5' />
                                <p>View My Concerts</p>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-4'>
                        <h1 className='text-xl font-semibold text-red-500'>Trains</h1>
                        <div>
                            <Link to="/vendor/trains/create" className='flex items-center gap-3 text-white bg-blue-500 rounded-lg py-3 px-4 shadow  hover:bg-blue-600 hover:shadow-md transition'>
                                <CirclePlus className='w-5 h-5' />
                                <p>Create New Train</p>
                            </Link>
                        </div>
                        <div>
                            <Link to="/vendor/trains/view" className='flex items-center gap-3 text-white bg-green-500 rounded-lg py-3 px-4 shadow  hover:bg-green-600 hover:shadow-md transition'>
                                <Film className='w-5 h-5' />
                                <p>View My Trains</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vendor_Dashboard