const mongoose=require('mongoose');

const concert_book_Schema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    concert:{type:mongoose.Schema.Types.ObjectId,ref:"Concert",required:true},
    concertName:String,
    artist:String,
    date:String,
    time:String,
    location:String,
    tickets:Number,
    totalPrice:Number,
},{timestamps:true});

const ConcertBooking = mongoose.model("ConcertBooking",concert_book_Schema);
module.exports={ConcertBooking};