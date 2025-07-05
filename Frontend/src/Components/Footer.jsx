import React from 'react'

const Footer = () => {
    return (
        <footer className=' bg-[#216583] flex flex-col items-center '>
            <div className='flex flex-row justify-between ml-20 py-8 px-6 gap-30'>

                    <div className='flex flex-col w-1/4'>
                        <h2 className='mb-2 text-lg font-bold text-white'>About UTBS</h2>
                            <p className='text-sm text-white'>UTBS is your one-stop platform to book movie, concert, and train tickets quickly and securely.</p>
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <h2 className='mb-2 text-lg font-bold text-white'>Quick Links</h2>
                        <div className='flex flex-col gap-1'>
                            <a className='text-sm text-white hover:underline' href="/">Home</a>
                            <a className='text-sm text-white hover:underline' href="/movies">Movies</a>
                            <a className='text-sm text-white hover:underline' href="/concerts">Concerts</a>
                            <a className='text-sm text-white hover:underline' href="/trains">Trains</a>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/4 gap-1'>
                        <h2 className='mb-2 text-lg font-bold text-white'>Account</h2>
                            <a className='text-sm text-white hover:underline' href="/login">Login</a>
                            <a className='text-sm text-white hover:underline' href="/register">Register</a>
                    </div>
                    <div className='flex flex-col w-1/4 gap-1'>
                        <h2 className='mb-2 text-lg font-bold text-white'>Legal</h2>
                            <a className='text-sm text-white hover:underline' href="#">Privacy Policy</a>
                            <a className='text-sm text-white hover:underline' href="#">Terms and Conditions</a>
                            <a className='text-sm text-white hover:underline' href="#">Contact Us</a>
                    </div>

            </div>
            <div className="text-center text-sm mb-8 text-white border-t border-white pt-4 w-full">
        © 2025 UTBS. All rights reserved.
      </div>

        </footer>
    )
}

export default Footer