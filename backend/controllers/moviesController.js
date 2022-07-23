const Movies = require("../models/Movies");
const { default: mongoose } = require("mongoose");
const originApi = require("../config/originApiMovies");

// Updates the database with the data received from the api
const updateDataBase = async (req, res) => {
  // Get 20 movies
  const receivedMovies_pt1 = await originApi.get("/now_playing", {
    params: {
      page: 2,
    },
  });

  // Get 20 movies
  const receivedMovies_pt2 = await originApi.get("/now_playing", {
    params: {
      page: 2,
    },
  });

  // Get 20 movies
  const receivedMovies_pt3 = await originApi.get("/now_playing", {
    params: {
      page: 3,
    },
  });

  // Merges 50 movies into an array
  const listReceivedMovies = [
    ...receivedMovies_pt1.data.results,
    ...receivedMovies_pt2.data.results,
    ...receivedMovies_pt3.data.results.slice(0, 10),
  ];

  // Check if the array is empty
  if (!listReceivedMovies) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  // Add director and producer
  const listMovies = await Promise.all(
    listReceivedMovies.map(async (movie) => {
      const data = await originApi.get(`/${movie.id}`, {
        params: {
          append_to_response: "credits",
        },
      });
      const directorData = data.data.credits.crew.filter(
        ({ job }) => job === "Director"
      );
      const producerData = data.data.credits.crew.filter(
        ({ job }) => job === "Producer"
      );
      return {
        ...movie,
        director: directorData,
        producers: producerData,
      };
    })
  );

  // Clear database
  await Movies.deleteMany();

  // Create new data
  const movies = await Promise.all(
    listMovies.map(async (movie) => {
      const newData = await Movies.create({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        movie_banner: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`,
        description: movie.overview,
        director: movie.director,
        producer: movie.producers,
      });
      return newData;
    })
  );

  if (movies) {
    const page = Math.max(0, req.params.page - 1);
    const perPage = 10;

    const movies = await Movies.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, movies) {
        Movies.count().exec(function (err, count) {
          res.status(201).json({
            movies,
            page: page || 1,
            pages: count / perPage,
          });
        });
      });
  }
};

// Get all movies - 10 out of 10
const getAllMovies = async (req, res) => {
  const page = Math.max(0, req.params.page - 1);
  const perPage = 10;
  try {
    const movies = await Movies.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, movies) {
        Movies.count().exec(function (err, count) {
          res.status(200).json({
            movies,
            page: page || 1,
            pages: count / perPage,
          });
        });
      });
  } catch (error) {
    res.status(422).json({ errors: ["Exceço de conexão com a TMDB"] });
    return;
  }
};

// Get movie by id
const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movies.findById(mongoose.Types.ObjectId(id));

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ errors: ["Filme não encontrado"] });
    return;
  }
};

module.exports = {
  updateDataBase,
  getAllMovies,
  getMovieById,
};
