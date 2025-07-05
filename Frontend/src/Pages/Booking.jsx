import React, { useState } from 'react'

const Booking = () => {

    const rows = 20;
    const cols = 10;
    const seats_array = [];
    const [seats, setSeats] = useState(null);
    const generate_seats = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                seats_array.push(
                    <div key={`${i}-${j}`} className="border border-gray-400 bg-gray-200 w-10 h-10 rounded cursor-pointer hover:bg-green-400 transition-colors flex justify-center items-center">{`${i * cols + j + 1}`}</div>
                )
            }
        }
        return seats_array;
    }
    const new_array_seats = generate_seats()

    return (
        <div className="p-6 bg-white border">
            <div className='w-full border p-4 bg-red-100 justify-center flex flex-col rounded-2xl items-center'>
                <div className="bg-emerald-400 p-5 m-4 w-fit rounded-xl shadow-lg text-white font-semibold select-none">
                    <h1 className="text-2xl font-bold text-center mb-1">Select Your Seats</h1>
                    <div className='flex flex-col justify-center items-center mb-5'>
                        <label className='font-semibold p-1'>How many seats do you want to book?</label>
                        <input type="number" min={1} value={seats} onChange={(e) => setSeats(e.target.value)} placeholder='Enter Number' max={rows * cols}   className="border rounded-md w-24 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-green-300" />
                    </div>
                </div>
                <div className="text-center bg-gray-300 w-md py-1 rounded mb-30 mt-10 text-sm">SCREEN</div>
                <div>
                    <div className='grid grid-cols-20 gap-3 w-full'>
                        {new_array_seats}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Booking
