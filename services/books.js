const MongoLib = require('../lib/mongo');
var jwt = require('jsonwebtoken');

class BooksServices{
  constructor(){
    this.collection = 'books'
    this.mongoDB = new MongoLib();
  }

  async getAllBooks(token){
    try {
      var decoded = jwt.verify(token, '12345');
      const books = await this.mongoDB.getAll(this.collection);
      return books;
    } catch (err) {
    }
  }

  async getOneBook(token, bookId){
    try {
      const book = await this.mongoDB.getOneBook(bookId);
      return book;
    } catch (error) {
      
    }
  }
  async editBook(token, bookId, data){
    try {
      const book = await this.mongoDB.editbook(bookId, data);
    } catch (error) {
      
    }
  }
  async registerBook(data){
    try {
      const book = await this.mongoDB.registerBook(data); 
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = BooksServices;
