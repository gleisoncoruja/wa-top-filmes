const express = require("express");

const router = express.Router();

// Controller
const {
  updateDataBase,
  getAllMovies,
  getMovieById,
} = require("../controllers/moviesController");

// Routes

router.post("/", updateDataBase);
router.get("/:page?", getAllMovies);
router.get("/detail/:id", getMovieById);

module.exports = router;
