require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes.js');
const movieListRoutes = require("./Routes/movieListRoutes.js")
const bookingRoutes = require("./Routes/bookingsRoute.js")
const concertListRoute = require("./Routes/concertListRoute.js");
const trainRoute = require('./Routes/trainRoutes.js')
const vendorRoutes = require('./Routes/vendorRoutes.js');

const { connectDB } = require('../config/db.js');
const app = express();

app.use(cors())
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use("/api/auth", authRoutes);

app.use("/api/movielist", movieListRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/concertList", concertListRoute);

app.use("/api/trains", trainRoute);

app.use('/api/vendor', vendorRoutes);

connectDB().then(() => {
    app.listen(8080, () => {
        console.log("LISTENING TO SERVER AT PORT 8080...")
    })
})