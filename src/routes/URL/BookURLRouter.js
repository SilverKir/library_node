const Book = require('../../model/Book.js');
const express = require('express');
const router = express.Router();
const bookFile = require('../../middleware/BookFile.js');
const BookRepository = require('../../repository/BookRepository.js');

const store=new BookRepository();

router.get('/', (req, res) => {
    const books=store.getAll();
    res.render('../src/views/book/index', { title: 'Books', books: books, });
});

router.get('/:id', (req, res) => {
    const book = store.getBookById(req.params.id);
    if (book) {
        res.render('../src/views/book/view', { title: 'Book | view', book: book, });
    } else {
        res.status(404).send('Book not found');
    }
});

router.get('/update/:id/', (req, res) => {
    const book = store.getBookById(req.params.id);
    if (book) {
        res.render('../src/views/book/update', { title: 'Book | edit', book: book, });
    } else {
        res.status(404).send('Book not found');
    }
});

router.post('/update/:id', bookFile.single('bookFile'),  (req, res) => {
    
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const book = store.getBookById(req.params.id);
    if (book) {
        book.title = title;
        book.description = description;
        book.authors = authors;
        book.favorite = favorite;
        book.fileCover = fileCover;
        book.fileName = fileName;
        if (req.file) {
            book.fileBook = req.file.filename;
        }
        store.updateBook(req.params.id, book);
        res.redirect('/url/books');
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports = router;