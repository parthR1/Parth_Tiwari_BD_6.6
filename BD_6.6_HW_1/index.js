const express = require("express");
const cors = require("cors");

const { getAllMovies, getMovieById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Get all movies
app.get("/movies", async (_req, res) => {
  const movies = getAllMovies();
  res.json({ movies });
});

// Get movie by targetID
app.get("/movies/details/:id", async (req, res) => {
  let movie = getMovieById(parseInt(req.params.id));

  res.json({
    movie,
  });
});

module.exports = { app };
