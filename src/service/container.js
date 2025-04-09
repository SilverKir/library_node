const Container = require("inversify").Container;
const BookRepository = require("../repository/BookRepository");

const container = new Container();
container.bind(BookRepository).toSelf();

module.exports = container;
