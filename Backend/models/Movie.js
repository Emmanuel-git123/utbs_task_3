const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String },
  Rated: { type: String },
  Released: { type: String },
  Runtime: { type: String },
  Genre: { type: String, required: true },
  Director: { type: String },
  Writer: { type: String },
  Actors: { type: String },
  Plot: { type: String },
  Language: { type: String },
  Country: { type: String },
  Awards: { type: String },
  Poster: { type: String },
  Metascore: { type: String },
  imdbRating: { type: Number },
  imdbVotes: { type: String },
  imdbID: { type: String },
  Type: { type: String },
  totalSeasons: { type: String },
  Response: { type: String },
  Price: { type: Number },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, {
  timestamps: true
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = { Movie };
