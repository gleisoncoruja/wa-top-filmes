const mongoose = require("mongoose");
const { Schema } = mongoose;

const moviesSchema = new Schema(
  {
    title: String,
    image: String,
    movie_banner: String,
    description: String,
    director: Array,
    producer: Array,
  },

  {
    timestamps: true,
  }
);

const Movies = mongoose.model("Movies", moviesSchema);

Movies.createCollection();

module.exports = Movies;
