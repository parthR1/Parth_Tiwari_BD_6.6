const request = require("supertest");
const http = require("http");
const { getAllBooks } = require("../controllers");
const { app } = require("../index.js");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3020);
});

afterAll(async () => {
  server.close();
});

describe("Controller Function Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all books", () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);

    const result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoints tests", () => {
  it("GET /books should return all books", async () => {
    const response = await request(server).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });
    expect(response.body.books.length).toBe(3);
  });

  it("GET /books/details/:id should get a book by id", async () => {
    const response = await request(server).get("/books/details/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
