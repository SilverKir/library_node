const Book = require('../../model/Book.js');
const express = require('express');
const router = express.Router();
const bookFile = require('../../middleware/BookFile.js');
const BookRepository = require('../../repository/BookRepository.js');
const deleteBookFile = require('../../controller/bookController.js');
const path = require('path');

const store = new BookRepository();

    router.get('/', async (req, res) => {
        try {
            const books = await store.getAll();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json(error);
        }
    });
    
    router.get('/:id', async (req, res) => {
       try {
            const book = await store.getBookById(req.params.id);
            res.json(book);
        } catch (error) {
            res.status(404).json(error);;
        }
    });

    router.get('/:id/download', async (req, res) => {
        const book = await store.getBookById(req.params.id);
        if (book && book.fileBook) {
            const filePath = path.join(__dirname,'..','..', '..', 'public', 'books', book.fileBook);
            res.download(filePath, book.title+'.'+book.fileBook.split('.')[1]);
        } else {
            res.status(404).send('Book not found');
        }
    });

    router.post('/', bookFile.single('bookFile'), async (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;   
        const book = new Book(title, description, authors, favorite, fileCover, fileName);
        if (req.file) {
            book.fileBook = req.file.filename;
        }
       try{await store.addBook(book);
        res.status(201).json(book);
       } catch (error){
            res.status(500).json(error);
        }   
    });

    router.put('/:id', bookFile.single('bookFile'), async (req, res) => {
        const {title, description, authors, favorite, fileCover, fileName} = req.body;
        const book = await store.getBookById(req.params.id);  
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
            await store.updateBook(req.params.id, book);
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    });


    router.delete('/:id', async (req, res) => {
        const book = await store.getBookById(req.params.id);  
        if (book) {
            deleteBookFile.deleteBookFile(book);
            await store.deleteBook(req.params.id);
            res.send('OK');
        } else {
            res.status(404).send('Book not found');
        }
    });

module.exports = router;