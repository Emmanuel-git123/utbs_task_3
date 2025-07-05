const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  language: String,
  format: String,
  date: String,
  time: String,
  tickets: Number,
  totalPrice: Number
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };
