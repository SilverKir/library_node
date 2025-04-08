const bookSchema = require("../model/bookSchema");

let instanse=null;

module.exports = class BookRepository {
  
    constructor() {
        if(instanse){
            return instanse;
        }
        instanse=this;
        this.store = bookSchema
        return instanse
    }

     async getAll() {
         return await this.store.find().select('-__v');
     }


    async getBookById(id) {
        return await this.store.findById(id).select('-__v');
    }

    async addBook(book) {
        const newBook = new this.store(book);
        await newBook.save();
        return newBook;
    }

    async updateBook(id, book) {
      await this.store.findByIdAndUpdate(id, book).select('-__v');
    }
    
    async deleteBook(id) {
        await this.store.findByIdAndDelete(id).select('-__v');
    }

}