const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, default: "concert" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

const Concert = mongoose.model("Concert", concertSchema);

module.exports = { Concert };
