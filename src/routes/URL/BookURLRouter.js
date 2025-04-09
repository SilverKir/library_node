const Book = require("../../model/Book.js");
const express = require("express");
const router = express.Router();
const bookFile = require("../../middleware/BookFile.js");
const BookRepository = require("../../repository/BookRepository.js");
const deleteBookFile = require("../../controller/bookController.js");
const counter = require("../../controller/counter.js");
const container = require("../../service/container.js");

const store = container.get(BookRepository);

router.get("/create", (req, res) => {
  res.render("../src/views/book/create", {
    title: "Book | create",
    book: new Book(),
  });
});

router.post("/create", bookFile.single("bookFile"), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const book = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName
  );
  if (req.file) {
    book.fileBook = req.file.filename;
  }

  try {
    await store.addBook(book);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await store.getAll();
    res.render("../src/views/book/index", { title: "Books", books: books });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", async (req, res) => {
  const book = await store.getBookById(req.params.id);
  if (book) {
    counter.setCounter(req.params.id);
    const count = await counter.getCount(req.params.id);
    res.render("../src/views/book/view", {
      title: "Book | view",
      book: book,
      count: count,
    });
  } else {
    res.status(404).send("Book not found");
  }
});

router.get("/update/:id/", async (req, res) => {
  try {
    const book = await store.getBookById(req.params.id);
    res.render("../src/views/book/update", {
      title: "Book | edit",
      book: book,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/update/:id", bookFile.single("bookFile"), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const book = await store.getBookById(req.params.id);
  if (book) {
    book.title = title;
    book.description = description;
    book.authors = authors;
    book.favorite = favorite;
    book.fileCover = fileCover;
    book.fileName = fileName;

    if (req.file) {
      deleteBookFile.deleteBookFile(book);
      book.fileBook = req.file.filename;
    }
    await store.updateBook(req.params.id, book);
    res.redirect("/url/books");
  } else {
    res.status(404).send("Book not found");
  }
});

router.post("/delete/:id", async (req, res) => {
  const book = await store.getBookById(req.params.id);
  if (book) {
    deleteBookFile.deleteBookFile(book);
    await store.deleteBook(req.params.id);
    res.redirect("/url/books");
  } else {
    res.status(404).send("Book not found");
  }
});

module.exports = router;
