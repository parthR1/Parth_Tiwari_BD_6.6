let movies = [
  {
    movieId: 1,
    title: "Inception",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
  },
  {
    movieId: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    director: "Frank Darabont",
  },
  {
    movieId: 3, 
    title: "The Godfather",
    genre: "Crime",
    director: "Francis Ford Coppola",
  },
  {
    movieId: 4,
    title: "Tenet",
    genre: "Sci-Fi",
    director: "Christopher Nolan",
  },
];

function getAllMovies() {
  return movies;
}

function getMovieById(targetId) {
  return movies.find((ele) => ele.movieId === targetId);
}

module.exports = { getAllMovies, getMovieById };
