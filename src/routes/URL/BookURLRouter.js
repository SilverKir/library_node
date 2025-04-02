const Book = require('../../model/Book.js');
const express = require('express');
const router = express.Router();
const bookFile = require('../../middleware/BookFile.js');
const BookRepository = require('../../repository/BookRepository.js');
const deleteBookFile = require('../../controller/bookController.js');
const counter = require('../../controller/counter.js');

const store=new BookRepository();

router.get('/create', (req, res) => {
    res.render('../src/views/book/create', { title: 'Book | create', book: new Book(), });
});

router.post('/create', bookFile.single('bookFile'), (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const book = new Book(title, description, authors, favorite, fileCover, fileName);
    if (req.file) {
        book.fileBook = req.file.filename;
    }
    store.addBook(book);

    res.redirect('/');
});


router.get('/', (req, res) => {
    const books=store.getAll();
    res.render('../src/views/book/index', { title: 'Books', books: books, });
});

router.get('/:id', async(req, res) => {
    const book = store.getBookById(req.params.id);
    if (book) {
       counter.setCounter(req.params.id)
       const count = await counter.getCount(req.params.id);
        res.render('../src/views/book/view', { title: 'Book | view', book: book, count: count, });
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
            deleteBookFile.deleteBookFile(book);
            book.fileBook = req.file.filename;
        }
        store.updateBook(req.params.id, book);
        res.redirect('/url/books');
    } else {
        res.status(404).send('Book not found');
    }
});

router.post('/delete/:id', (req, res) => {
    const book = store.getBookById(req.params.id);
    if (book) {
        deleteBookFile.deleteBookFile(book);
        store.deleteBook(req.params.id);
        res.redirect('/url/books');
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports = router;