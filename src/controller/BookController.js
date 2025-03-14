const Book = require('../model/Book.js');
const express = require('express');
const router = express.Router();

const store={
    books:[],
};

    router.get('/', (req, res) => {
        res.json(store.books);
    });
    
    router.get('/:id', (req, res) => {
        const book = store.books.find(b => b.id === req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    });


    router.post('/', (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        const book = new Book(title, description, authors, favorite, fileCover, fileName);
        store.books.push(book);
        res.status(201).json(book);
    });

    router.put('/:id', (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        const book = store.books.find(b => b.id === req.params.id);
        if (book) {
            book.title = title;
            book.description = description;
            book.authors = authors;
            book.favorite = favorite;
            book.fileCover = fileCover;
            book.fileName = fileName;
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