const { Train } = require("../../models/Train")
const { User } = require("../../models/User")
const { TrainBooking } = require("../../models/TrainBooking")

const getTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json({ trains });
    } catch (err) {
        console.error("Error fetching trains:", err);
        res.status(500).json({ message: "Server error while fetching trains" });
    }
}

const getSearchedTrains = async (req, res) => {
    const { source, destination } = req.query;

    if (!source || !destination) {
        return res.status(400).json({ message: "Missing source or destination" });
    }

    try {
        const trains = await Train.find({ source, destination });
        res.status(200).json({ trains });
    } catch (err) {
        console.error("Search error:", err);
        res.status(500).json({ message: "Server error during train search" });
    }
}

const getAllBookedTrains = async (req, res) => {
    try {
        const user_id = req.user.id;

        const user = await User.findById(user_id).populate({
            path: "trainBookings",
            populate: {
                path: "train",
                model: "Train"
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ trainBookings: user.trainBookings });
    } catch (error) {
        console.error("getAllBookedTrains error:", error);
        res.status(500).json({ message: "Server error while fetching booked trains" });
    }
};

const bookTrain = async (req, res) => {
    try {
        const { trainId, trainName, trainNumber, source, destination, departureTime, arrivalTime, tickets, totalPrice, travelDate } = req.body;

        if (!trainId || !trainName || !trainNumber || !source || !destination || !departureTime || !arrivalTime || !tickets || !totalPrice || !travelDate) {
            return res.status(400).json({ message: "Missing train booking details" });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        if (train.vendorId.toString() === req.user.id) {
            return res.status(400).json({ message: "Vendors cannot book their own trains" });
        }

        if (user.balance < totalPrice) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const newBooking = new TrainBooking({
            user: user._id,
            train: trainId,
            trainName,
            trainNumber,
            source,
            destination,
            departureTime,
            arrivalTime,
            travelDate,
            tickets,
            totalPrice
        });

        await newBooking.save();

        user.balance -= totalPrice;
        user.trainBookings.push(newBooking._id);
        await user.save();

        const vendor = await User.findById(train.vendorId);
        if (vendor) {
            vendor.balance += totalPrice;
            await vendor.save();
        }

        res.status(201).json({ message: "Train booking successful", trainBooking: newBooking });
    } catch (error) {
        console.error("bookTrain error:", error);
        res.status(500).json({ message: "Server error while booking train" });
    }
};

const cancelTrainBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await TrainBooking.findById(bookingId);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this booking" });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.balance += booking.totalPrice;
        const train = await Train.findById(booking.train);
        const vendor = await User.findById(train.vendorId);
        if (vendor) {
            vendor.balance -= booking.totalPrice;
            await vendor.save();
        }
        user.trainBookings.pull(bookingId);
        await user.save();

        await TrainBooking.findByIdAndDelete(bookingId);

        res.status(200).json({ message: "Booking deleted and amount refunded" });

    } catch (error) {
        console.error("deleteBookings error:", error);
        res.status(500).json({ message: "Server error while deleting booking" });
    }
};



module.exports = {
    getTrains,
    getSearchedTrains,
    getAllBookedTrains,
    bookTrain,
    cancelTrainBooking
}