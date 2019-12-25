const MongoClient = require('mongodb').MongoClient;
const { config } = require('../config')
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword);

const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0-0dcpa.mongodb.net/test?retryWrites=true&w=majority`
//const MONGO_URI = `mongodb+srv://${config.dbName}:${config.dbPassword}@cluster0-0dcpa.mongodb.net/test?retryWrites=true&w=majority`;
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

class MongoLib{
  constructor(){
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  connect(){
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if(err){
          reject(err);
        }
        console.log("Connected to mongoDB");
        resolve(this.client.db(this.dbName))
      })
    });
  }

  getAll(collection, user){
    return this.connect().then(db =>{
      return db.collection(collection).find({}).toArray();
    });
  }

  getOneBook(bookId){
    return this.connect().then(db =>{
      return db.collection("books").findOne(bookId);
    });
  }

  registerUser(user){
    return this.connect().then(db =>{
      return db.collection("users").insertOne(user);
    });
  }

  getUserByEmail(email){
    return this.connect().then(db =>{
      return db.collection("users").findOne({"email":email});
    });
  }
  editbook(bookid, data){
    return this.connect().then(db =>{
      return db.collection("books").updateOne({_id: bookid }, data);
    });
  }

  registerBook(user, data){
    return this.connect().then(db =>{
      return db.collection("books").insertOne(user);
    });
  }

  deleteBook(user, bookid){
    return thie.connect().then(db =>{
      return db.collection("books").deleteOne({_id: bookid})
    });
  }
}

module.exports = MongoLib;
