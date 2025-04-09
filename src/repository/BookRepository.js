const bookSchema = require("../model/bookSchema");

module.exports = class BookRepository {
  constructor() {
    this.store = bookSchema;
  }

  async getAll() {
    return await this.store.find().select("-__v");
  }

  async getBookById(id) {
    return await this.store.findOne({ id: id }).select("-__v");
  }

  async addBook(book) {
    const newBook = new this.store(book);
    await newBook.save();
    return newBook;
  }

  async updateBook(id, book) {
    await this.store.findOneAndUpdate({ id: id }, book).select("-__v");
  }

  async deleteBook(id) {
    await this.store.findOneAndDelete({ id: id }).select("-__v");
  }
};
