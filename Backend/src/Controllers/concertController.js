const { Concert } = require("../../models/Concert");
const { User } = require("../../models/User");
const { ConcertBooking } = require("../../models/ConcertBooking");
const { model } = require("mongoose");

const getAllConcerts = async (req, res) => {
    try {
        const all_concerts = await Concert.find();
        res.status(200).json(all_concerts);
    } catch (error) {
        console.error("Error in the getAllConcerts function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getConcertById = async (req, res) => {
    try {
        const selected_concert = await Concert.findById(req.params.id);
        if (!selected_concert) {
            return res.status(404).json({ message: "Concert not found" });
        }
        res.status(200).json(selected_concert);
    } catch (error) {
        console.error("Error in the getConcertById function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const createConcerts = async (req, res) => {
    try {
        const submitted_concert = req.body;
        const new_concert = new Concert(submitted_concert);
        await new_concert.save();
        res.status(201).json({ message: "Concert Successfully created", concert: new_concert })
    } catch (error) {
        console.error("Error in the createConcerts function:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


const buyConcert = async (req, res) => {
    try {
        const { concertId, concertName, artist, date, time, location, tickets, totalPrice } = req.body;

        if (!concertId || !concertName || !artist || !date || !time || !location || !tickets || !totalPrice) {
            return res.status(400).json({ message: "Missing Concert details" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not Found" });
        }
        const concert = await Concert.findById(concertId);
        if (!concert) {
            return res.status(404).json({ message: "Concert not found" });
        }
        if (concert.vendorId.toString() === req.user.id) {
            return res.status(400).json({ message: "Vendors cannot book their own concerts" });
        }
        if (user.balance < totalPrice) {
            return res.status(400).json({ message: "Insufficient Balance" });
        }

        const new_Concert = new ConcertBooking({
            user: user._id,
            concert: concertId,
            concertName,
            artist,
            date,
            time,
            location,
            tickets,
            totalPrice
        });

        await new_Concert.save();

        user.balance -= totalPrice;
        user.concertBookings.push(new_Concert._id);
        await user.save();

        const vendor = await User.findById(concert.vendorId);
        if (vendor) {
            vendor.balance += totalPrice;
            await vendor.save();
        }

        res.status(201).json({ message: "Booking successful", concertBookings: new_Concert });
    } catch (error) {
        console.error("buyConcert error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const getAllBookedConcerts = async (req, res) => {
    try {

        console.log("Decoded user from token:", req.user);
        const user_id = req.user.id;

        const user = await User.findById(user_id).populate({
            path: "concertBookings",
            populate: {
                path: "concert",
                model: "Concert"
            }
        });

        if (!user) {
            console.log("User not found with id:", user_id);
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ concertBookings: user.concertBookings });
    } catch (error) {
        console.error("getUserBookings error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const deleteConcert = async (req, res) => {
    try {
        const bookingId = req.params.id;

        const booking = await ConcertBooking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this booking" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.balance += booking.totalPrice;

        const concert = await Concert.findById(booking.concert);
        if (!concert) return res.status(404).json({ message: "Concert not found" });

        const vendor = await User.findById(concert.vendorId);
        if (vendor) {
            vendor.balance -= booking.totalPrice;
            await vendor.save();
        }

        user.concertBookings.pull(bookingId);
        await user.save();

        await ConcertBooking.findByIdAndDelete(bookingId);

        res.status(200).json({ message: "Concert booking cancelled and amount refunded" });

    } catch (error) {
        console.error("deleteTrainBooking error:", error);
        res.status(500).json({ message: "Server error while cancelling Concert booking" });
    }
};


module.exports = {
    getAllConcerts,
    getConcertById,
    createConcerts,
    buyConcert,
    getAllBookedConcerts,
    deleteConcert
}