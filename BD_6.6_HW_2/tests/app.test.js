const request = require("supertest");
const http = require("http");
const { getAllGames } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllGames: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3010);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all games", () => {
    let mockedGames = [
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

    getAllGames.mockReturnValue(mockedGames);

    let result = getAllGames();
    expect(result).toEqual(mockedGames);
    expect(result.length).toBe(4);
  });
});

describe("API Endpoint tests", () => {
  it("GET /games should get all games", async () => {
    const response = await request(server).get("/games");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      games: [
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
      ],
    });
    expect(response.body.games.length).toBe(4);
  });

  it("GET /games/details/:id should get a game by id", async () => {
    const response = await request(server).get("/games/details/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      game: {
        gameId: 1,
        title: "The Legend of Zelda: Breath of the Wild",
        genre: "Adventure",
        platform: "Nintendo Switch",
      },
    });
  });
});
