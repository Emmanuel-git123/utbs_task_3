const mongoose = require("mongoose");

const trainBookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    train: { type: mongoose.Schema.Types.ObjectId, ref: "Train", required: true },
    trainName: { type: String, required: true },
    trainNumber: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    travelDate: { type: String, required: true },
    tickets: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
}, { timestamps: true });

const TrainBooking = mongoose.model("TrainBooking", trainBookingSchema);
module.exports = { TrainBooking };
