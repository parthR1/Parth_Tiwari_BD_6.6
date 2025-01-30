const express = require("express");
const cors = require("cors");

const { getAllBooks, getBookById } = require("./controllers");

const app = express();

app.use(express.json());
app.use(cors());

// GET all books
app.get("/books", async (_req, res) => {
  const books = getAllBooks();
  res.json({ books });
});

// GET book by ID
app.get("/books/details/:id", async (req, res) => {
  const book = getBookById(parseInt(req.params.id));
  res.json({ book });
});

module.exports = { app };
