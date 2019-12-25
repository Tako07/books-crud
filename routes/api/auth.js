const express = require('express');
const { check, validationResult } = require('express-validator');
const passport = require("passport");
const boom = require("boom");
const jwt = require("jsonwebtoken");
const router = express.Router();
const AuthServices = require('../../services/auth');


const authServices = new AuthServices();

router.post('/register',
  [check('name').isAlpha(),
  check('email').isEmail(),
  check('password').isAlphanumeric()
  ],
  async function(req, res, next){
    const { body : user } = req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const name = user.name;
    const email = user.email;
    const password = user.password;
    try {
      const register = await authServices.registerUser(user);
      return res.status(201).json({newUser: register, message:"Usuario registrado con éxito"});
    }catch (error) {
      return res.status(500).json({message: "El usuario ya se encuentra registrado"});
    }

});

router.post('/login',
async function(req, res, next){
  const { body : user } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const email = user.email;
  const password = user.password;
  try {
    const accesToken = await authServices.login(email,password);
    return res.status(200).json({access_token: accesToken})
  } catch (error) {
    return res.status(500);
  }
});

module.exports = router;
