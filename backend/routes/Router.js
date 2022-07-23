const express = require("express");
const router = express();
const path = require("path");

router.use("/api/movies", require("./MoviesRoutes"));

// test route
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../views/index.html"));
});

module.exports = router;
