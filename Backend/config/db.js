const mongoose = require("mongoose");
const MONGO_URI=process.env.MONGO_URI

const connectDB=async()=>{
    try {
        await mongoose.connect(MONGO_URI)

        console.log("MONGODB CONNECTED SUCCESSFULLY")

    } catch (error) {
        console.error("Error connecting to MONGODB", error)
        process.exit(1);
    }
}

module.exports={connectDB};