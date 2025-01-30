let games = [
  {
    gameId: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    genre: "Adventure",
    platform: "Nintendo Switch",
  },
  {
    gameId: 2,
    title: "Red Dead Redemption 2",
    genre: "Action",
    platform: "PlayStation 4",
  },
  {
    gameId: 3,
    title: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    platform: "PC",
  },
  {
    gameId: 4,
    title: "The Last Of Us",
    genre: "Adventure",
    platform: "PlayStation 4",
  },
];

function getAllGames() {
  return games;
}

function getGameById(targetId) {
  return games.find((ele) => ele.gameId === targetId);
}

module.exports = {
  getAllGames,
  getGameById,
};
