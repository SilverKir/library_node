const Book = require('../model/Book.js');
const express = require('express');
const router = express.Router();
const bookFile = require('../middleware/BookFile');

const store={
    books:[],
};

    router.get('/', (req, res) => {
        res.status(200).json(store.books);
    });
    
    router.get('/:id', (req, res) => {
        const book = store.books.find(b => b.id === req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    });


    router.post('/', bookFile.single('bookFile'), (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        console.log(req.headers['content-type'])
        console.log(req.body);
        console.log(req.file);
        const book = new Book(title, description, authors, favorite, fileCover, fileName);
        if (req.file) {
            book.fileBook = req.file.filename;
        }
        store.books.push(book);
        res.status(201).json(book);
    });

    router.put('/:id', bookFile.single('bookFile'), (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        const book = store.books.find(b => b.id === req.params.id);
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
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    });

    router.delete('/:id', (req, res) => {
        const bookIndex = store.books.findIndex(b => b.id === req.params.id);
        if (bookIndex !== -1) {
            store.books.splice(bookIndex, 1);
            res.send('OK');
        } else {
            res.status(404).send('Book not found');
        }
    });

module.exports = router;