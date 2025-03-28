
let instanse=null;

module.exports = class BookRepository {
  
    constructor() {
        if(instanse){
            return instanse;
        }
        instanse=this;
        this.store = {
            books: [],
        }
        return instanse
    }

    

    getAll() {
        return this.store.books;
    }

    getBookById(id) {
        return this.store.books.find(b => b.id === id);
    }

    addBook(book) {
        this.store.books.push(book);
    }
    updateBook(id, book) {
        const index = this.store.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.store.books[index] = book;
        }
    }
    deleteBook(id) {
        const index = this.store.books.findIndex(b => b.id === id);
        if (index !== -1) {
            this.store.books.splice(index, 1);
        }
    }

}