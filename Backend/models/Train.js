const mongoose = require('mongoose');

const train_schema = mongoose.Schema({
    trainName: { type: String, required: true },
    trainNumber: { type: Number, required: true, unique: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    date: { type: String },
    price: { type: Number, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    category: { type: String, default: "train" },
},{timestamps:true});

const Train = mongoose.model("Train",train_schema);

module.exports={Train};