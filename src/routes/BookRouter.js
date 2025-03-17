const Book = require('../model/Book.js');
const express = require('express');
const router = express.Router();
const bookFile = require('../middleware/BookFile');
const fs = require('fs');
const path = require('path');


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

    router.get('/:id/download', (req, res) => {
        const book = store.books.find(b => b.id === req.params.id);
        if (book && book.fileBook) {
            const filePath = path.join(__dirname,'..', '..', 'public', 'books', book.fileBook);
            res.download(filePath, book.title+'.'+book.fileBook.split('.')[1]);
        } else {
            res.status(404).send('Book not found');
        }
    });

    router.post('/', bookFile.single('bookFile'), (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;   
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
            const book = store.books[bookIndex];
            if (book.fileBook)
            {fs.unlinkSync(path.join(__dirname,'..' ,'..', 'public', 'books', book.fileBook));}

            store.books.splice(bookIndex, 1);
            res.send('OK');
        } else {
            res.status(404).send('Book not found');
        }
    });

module.exports = router;