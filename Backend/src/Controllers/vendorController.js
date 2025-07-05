const { Movie } = require("../../models/Movie");
const { Concert } = require("../../models/Concert");
const { Train } = require("../../models/Train");
const {Booking} = require("../../models/MovieBooking")
const {User} = require("../../models/User");
const { ConcertBooking } = require("../../models/ConcertBooking");
const { TrainBooking } = require("../../models/TrainBooking");

const refundanddeleteBookings =async (bookings) => {
    for (const booking of bookings) {
        const user = await User.findById(booking.user);
        if (user) {
            user.balance += booking.totalPrice;
            await user.save();
        }
        await booking.deleteOne();
    }
}

const createMovies = async (req, res) => {
    try {
        const { Title, Genre, Price, Type, Runtime, Rated, Released, Plot, imdbVotes, imdbRating, Language, Country } = req.body;
        if (!Title || !Genre || !Price || !Type || !Runtime || !Rated || !Released || !Plot || !imdbVotes || !imdbRating || !Language || !Country) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const new_movie = new Movie({ Title, Genre, Price, Type, Runtime, Rated, Released, Plot, imdbVotes, imdbRating, Language, Country, vendorId: req.user.id })
        await new_movie.save();

        res.status(201).json({ message: "Movie successfully created", movie: new_movie })
    } catch (error) {
        console.error("createMovies error:", error);
        res.status(500).json({ message: "Server error while creating movie" });
    }
}
const showMovies = async (req, res) => {
    try {
        const movies = await Movie.find({ vendorId: req.user.id });
        res.status(200).json({ movies });
    } catch (error) {
        console.error("showMovies error:", error);
        res.status(500).json({ message: "Server error while fetching movies" });
    }
}
const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Unable to update this movie" });
        }
        if (movie.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this movie" });
        }
        const updated_movie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ message: "Movie updated successfully", movie: updated_movie });
    } catch (error) {
        res.status(500).json({ message: "Server error while updating movie" });
    }
}
const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unable to delete this movie" });
        }
        const bookings=await Booking.find({movie:req.params.id});
        await refundanddeleteBookings(bookings);

        await movie.deleteOne();

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("deleteMovie error:", error);
        res.status(500).json({ message: "Server error while deleting movie" });
    }
};

const showSelectedMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (movie.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to access this movie" });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.error("showSelectedMovie error:", error);
        res.status(500).json({ message: "Server error while fetching movie" });
    }
};

const createConcerts = async (req, res) => {
    try {
        const { name, artist, location,date, time, price } = req.body;
        if (!name || !artist || !location||!date || !time || !price) {
            return res.status(400).json({ message: "Missing required Fields" });
        }
        const new_concert = new Concert({ name, artist, location,date, time, price, vendorId: req.user.id });
        await new_concert.save();

        res.status(201).json({ message: "Concert successfully created", concert: new_concert })
    } catch (error) {
        console.error("createConcerts error:", error);
        res.status(500).json({ message: "Server error while creating concert" });
    }
}

const showConcerts = async (req, res) => {
    try {
        const concerts = await Concert.find({ vendorId: req.user.id });
        res.status(200).json({ concerts });
    } catch (error) {
        console.error("showConcerts error:", error);
        res.status(500).json({ message: "Server error while fetching concerts" });
    }
}

const deleteConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: "Concert not found" });
        }
        if (concert.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unable to delete this concert" });
        }
        const bookings=await ConcertBooking.find({concert:req.params.id});
        await refundanddeleteBookings(bookings);
        await concert.deleteOne();
        res.status(200).json({ message: "Concert deleted successfully" });
    } catch (error) {
        console.error("deleteConcert error:", error);
        res.status(500).json({ message: "Server error while deleting concerts" });
    }
}

const showSelectedConcerts = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: "Concert not found" });
        }
        if (concert.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to access this concert" });
        }
        res.status(200).json({ concert });
    } catch (error) {
        console.error("showSelectedConcerts error:", error);
        res.status(500).json({ message: "Server error while fetching concert" });
    }
}

const updateConcert = async (req, res) => {
    try {
        const concert = await Concert.findById(req.params.id);
        if (!concert) {
            return res.status(404).json({ message: "Unable to update this concert" });
        }
        if (concert.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this concert" });
        }
        const updated_concert = await Concert.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ message: "Concert updated successfully", concert: updated_concert });
    } catch (error) {
        res.status(500).json({ message: "Server error while updating concert" });
    }
}

const createTrains = async (req, res) => {
    try {
        const { trainName, trainNumber, source, destination, departureTime, arrivalTime, price } = req.body;
        if (!trainName || !trainNumber || !source || !destination || !departureTime || !arrivalTime || !price) {
            return res.status(400).json({ message: "Missing Required Fields" });
        }
        const new_train = new Train({ trainName, trainNumber, source, destination, departureTime, arrivalTime, price, vendorId: req.user.id })
        await new_train.save();

        res.status(201).json({ message: "Train Successfully Created" });
    } catch (error) {
        console.error("Error in createTrains: ", error);
        res.status(500).json({ message: "Server error while showing train" });
    }
}

const showTrains = async (req, res) => {
    try {
        const trains = await Train.find({ vendorId: req.user.id });
        res.status(200).json({ trains });
    } catch (error) {
        console.error("Error in showTrains:", error);
        res.status(500).json({ message: "Server error while showing train" })
    }
}

const showSelectedTrain = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        if (train.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to access this train" });
        }
        res.status(200).json({ train });
    } catch (error) {
        console.error("showSelectedConcerts error:", error);
        res.status(500).json({ message: "Server error while fetching train" });
    }
}

const updateTrain = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        if (train.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to access this train" });
        }
        const updated_train = await Train.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
        res.status(200).json({ message: "Updated Train Successfully", train: updated_train });
    } catch (error) {
        console.error("Error in Updatetrain:", error);
        res.status(500).json({ message: "Server error while updating train" });
    }
}

const deleteTrain = async (req, res) => {
    try {
        const train = await Train.findById(req.params.id);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        if (train.vendorId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to access this train" });
        }
        const bookings=await TrainBooking.find({train:req.params.id});
        await refundanddeleteBookings(bookings);
        await train.deleteOne();
        res.status(200).json({ message: "Successfully deleted the train" });
    } catch (error) {
        console.error("Error in deleteTrain:", error);
        res.status(500).json({ message: "Server  error while deleting train" });
    }
}

const searchTrains = async (req, res) => {
    try {
        const { source, destination } = req.query;

        if (!source || !destination) {
            return res.status(400).json({ message: "Missing source or destination in query" });
        }

        const trains = await Train.find({ source, destination });

        res.status(200).json({ trains });
    } catch (error) {
        console.error("Error in searchTrainsPublic:", error);
        res.status(500).json({ message: "Server error while searching trains" });
    }
};

module.exports = {
    createMovies,
    showMovies,
    updateMovie,
    deleteMovie,
    showSelectedMovie,

    createConcerts,
    showConcerts,
    deleteConcert,
    showSelectedConcerts,
    updateConcert,

    createTrains,
    showTrains,
    showSelectedTrain,
    updateTrain,
    deleteTrain,
    searchTrains
}