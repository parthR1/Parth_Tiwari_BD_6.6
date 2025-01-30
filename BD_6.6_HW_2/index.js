const express = require("express");
const cors = require("cors");

const { getAllGames, getGameById } = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

// Get all games
app.get("/games", async (_req, res) => {
  const games = getAllGames();
  res.json({ games });
});

// Get game by targetID
app.get("/games/details/:id", async (req, res) => {
  let game = getGameById(parseInt(req.params.id));

  res.json({
    game,
  });
});

module.exports = { app };
