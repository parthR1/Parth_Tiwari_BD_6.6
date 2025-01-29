const request = require("supertest");
const http = require("http");
const { getAllMovies } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all movies", () => {
    let mockedMovies = [
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

    getAllMovies.mockReturnValue(mockedMovies);

    let result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  it("GET /movies should get all movies", async () => {
    const response = await request(server).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movies: [
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
      ],
    });
    expect(response.body.movies.length).toBe(3);
  });

  it("GET /movies/details/:id should get an movie by ID", async () => {
    const response = await request(server).get("/movies/details/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      movie: {
        movieId: 1,
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
      },
    });
  });
});
