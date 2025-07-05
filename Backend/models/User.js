const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Vendor', 'Admin'], default: 'User', required: true },
    balance: { type: Number, default: 2000 },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    concertBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ConcertBooking" }],
    trainBookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "TrainBooking" }],
    otp: { type: Number },
    otpExpiresAt: { type: Date },
    profilePic:{type:String, default:""},
},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema);

module.exports = { User };
