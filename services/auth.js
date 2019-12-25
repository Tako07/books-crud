const MongoLib = require('../lib/mongo');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

class AuthServices{
  constructor(){
    this.collection = 'auth'
    this.mongoDB = new MongoLib();
  }

  async registerUser(user){
    try {
        const checkIfExist = await this.mongoDB.getUserByEmail(user.email);
        if(checkIfExist){
            throw new Error({err:"el usuario ya se encuentra registrado"});
        }
        const registereduser = await this.mongoDB.registerUser(user);
        return registereduser;   
    } catch (error) {
        throw new Error(error);
    }
  }

  async login(email, password){
    try {
        const retrivedUser = await this.mongoDB.getUserByEmail(email);
        let aux = retrivedUser;
        if( aux.password == password ){
            const payload = { id: aux._id }
            const token = jwt.sign({data: payload}, 'secret', {
            expiresIn: "24h",
        });
        return token;
        }
    } catch (error) {
        throw new Error("Error");
    }
  }
}

module.exports = AuthServices;
