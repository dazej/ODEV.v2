const express = require('express');
const apiRouter = express.Router();
const { requireAdmin, requiredNotSent, requireUser } = require('./utils')
const {    
    createCart,
    getCartById,
    getAllCarts,
    updateCarts,
    deleteCart, 
    getCartByUserId } = require('../db/cart')


apiRouter.get('/', async(req, res, next)=>{
    try{
        const cart = await getAllCarts();
        res.send(cart);
    }catch (error){
        next(error);
    }
});

apiRouter.get('/:id', async (req, res, next) => {
    try {
        const cart = await getCartById(req.params.id);
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

apiRouter.get('/users/:id', async (req, res, next) => {
  try {
      const cart = await getCartByUserId(req.params.id);
      res.send(cart);
  } catch (error) {
      next(error);
  }
});


apiRouter.post('/', requireUser, requiredNotSent({requiredParams: ["userId", "productId", 'quantity']}), async (req, res, next) => {
    try {
      const {userId, productId, quantity} = req.body;
      const createdCart = await createCart({userId, productId, quantity});
      if(createdCart) {
        res.send(createdCart);
      } else {
        next({
          name: 'FailedToCreate',
          message: 'There was an error creating your cart. Please check item availality'
        })
      }
    } catch (error) {
      next(error);
    }
});

apiRouter.patch('/:cartId', requireUser, requiredNotSent({requiredParams: ["userId", "productId", 'quantity'], atLeastOne: true}), async (req, res, next) => {
    try {
      const {userId, productId, quantity} = req.body;
      const {cartId} = req.params;
      const cartToUpdate = await getCartById(cartId);
      if(!cartToUpdate) {
        next({
          name: 'NotFound',
          message: `No order by ID ${cartId}`
        })
      } else {
        const updatedCart = await updateCarts({id: cartId, userId, productId, quantity});
        if(updatedCart) {
          res.send(updatedCart);
        } else {
          next({
            name: 'FailedToUpdate',
            message: 'There was an error updating your product'
          })
        }
      }
    } catch (error) {
      next(error);
    }
});
  
apiRouter.delete('/:cartId', async (req, res, next) => {
    try {
      const {cartId} = req.params;
      const cartToUpdate = await getCartById(cartId);
      if(!cartToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ${cartId}`
        })
      } else {
        const deletedCart = await deleteCart(cartId)
        // res.send(`You Have Deleted cart ` + deletedCart);
        res.send({message: "you deleted it"})
      }
    } catch (error) {
      next(error);
    }
});



module.exports = apiRouter