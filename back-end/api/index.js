const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const {getUserById} = require('../db/users');
const client = require('../db/client');
const JWT_SECRET = 'neverTell'

  
  // set `req.user` if possible
  apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    
    if (!auth) { // nothing to see here
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      
      try {
        const parsedToken = jwt.verify(token, JWT_SECRET)
      
        const id = parsedToken && parsedToken.id
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch (error) {
        next(error);
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  });
  
  apiRouter.use((req, res, next) => {
    if (req.user) {
      console.log("User is set:", req.user);
    }
    next();
  });
  



const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const addressRouter = require('./address');
apiRouter.use('/address', addressRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const productCatRouter = require('./product-cat');
apiRouter.use('/product-cat', productCatRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);




module.exports = apiRouter