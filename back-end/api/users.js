const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUser, getUserByUsername, createUser, getUserById, getAllUsers } = require('../db/users');
const client = require('../db/client');
const { JWT_SECRET = 'neverTell'} = process.env;


// routes for login, register, and account view will be in this file
apiRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both
    if (!username || !password) {
      next({
        name: 'MissingCredentialsError',
        message: 'Please enter both a username and password'
      });
    }
  
    try {
      const user = await getUser({username, password});
      if(!user) {
        next({
          name: 'IncorrectCredentialsError',
          message: 'Username or password is incorrect',
        })
      } else {
        const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET,{ expiresIn: '1w' });
        res.send({ user, message: "you're logged in!", token });
      }
    } catch (error) {
      next(error);
    }
  });
  
  apiRouter.post('/register', async (req, res, next) => {
    try {
      const {username, password, first_name, last_name, email, phone_number, type} = req.body;
      const queriedUser = await getUserByUsername(username);
      if (queriedUser) {
        res.status(401);
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      } else {
        const user = await createUser({
          username,
          password,
          first_name,
          last_name,
          email,
          phone_number,
          type
        });
        if (!user) {
          next({
            name: 'UserCreationError',
            message: 'There was a problem registering you. Please try again.',
          });
        } else {
          const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, { expiresIn: '1w' });
          res.send({ user, message: "you're signed up!", token });
        }
      }
    } catch (error) {
      next(error)
    }
  })

  apiRouter.get('/account', async (req, res, next) =>{
    try{
        res.send(req.user.body);
    }catch(error){
        next("cannot load account", error)
    }
  });

  apiRouter.get('/', async (req, res, next) =>{
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  });



apiRouter.get('/:id', async (req, res, next) => {
  try {
      const product = await getUserById(req.params.id);
      res.send(product);
  } catch (error) {
      next(error);
  }
});

  
  
  






module.exports = apiRouter