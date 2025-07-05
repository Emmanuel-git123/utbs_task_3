const { User } = require("../../models/User");
const { Booking } = require("../../models/MovieBooking");
const { Movie } = require("../../models/Movie");

const saveBookings = async (req, res) => {
    try {
        const { movieId, language, format, date, time, tickets, totalPrice } = req.body;

        if (!movieId || !language || !format || !date || !time || !tickets || !totalPrice) {
            return res.status(400).json({ message: "Missing booking details" });
        }

        const user = await User.findById(req.user.id);
        const movie = await Movie.findById(movieId);

        if (!movie) return res.status(404).json({ message: "Movie not found" });

        if (movie.vendorId.toString() === req.user.id) {
            return res.status(403).json({ message: "Vendors cannot book their own movies" });
        }

        const vendor = await User.findById(movie.vendorId);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.balance < totalPrice) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const booking = new Booking({
            user: user._id,
            movie: movieId,
            language,
            format,
            date,
            time,
            tickets,
            totalPrice
        });

        await booking.save();

        user.balance -= totalPrice;
        vendor.balance += totalPrice;
        user.bookings.push(booking._id);
        await user.save();
        await vendor.save();

        res.status(201).json({ message: "Booking successful", booking });
    } catch (error) {
        console.error("saveBookings error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getBookings = async (req, res) => {
    try {
        const user_id = req.user.id;

        const user = await User.findById(user_id).populate({
            path: "bookings",
            populate: {
                path: "movie",
                model: "Movie"
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ bookings: user.bookings });

    } catch (error) {
        console.error("getUserBookings error:", error);
        res.status(500).json({ message: "Server error" });
    }
}


const deleteBookings = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this booking" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.balance += booking.totalPrice;
        const movie = await Movie.findById(booking.movie);
        const vendor = await User.findById(movie.vendorId);
        if (vendor) {
            vendor.balance -= booking.totalPrice;
            await vendor.save();
        }
        user.bookings.pull(bookingId);
        await user.save();

        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({ message: "Booking deleted and amount refunded" });

    } catch (error) {
        console.error("deleteBookings error:", error);
        res.status(500).json({ message: "Server error while deleting booking" });
    }
};


module.exports = { saveBookings, getBookings, deleteBookings };
