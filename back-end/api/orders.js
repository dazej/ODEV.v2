const express = require('express');
const apiRouter = express.Router();
const { requireAdmin, requiredNotSent, requireUser } = require('./utils')
const { createOrders, getOrdersById, getAllOrders, updateOrder, deleteOrder, getOrdersByUserId} = require('../db/orders')



apiRouter.get('/', async(req, res, next)=>{
    try{
        const orders = await getAllOrders();
        res.send(orders);
    }catch (error){
        next(error);
    }
});

apiRouter.get('/:id', async (req, res, next) => {
    try {
        const orders = await getOrdersById(req.params.id);
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

apiRouter.get('/users/:id', requireUser, async (req, res, next) => {
  try {
      const orders = await getOrdersByUserId(req.params.id);
      res.send(orders);
  } catch (error) {
      next(error);
  }
});



apiRouter.post('/users/:id', requireUser, requiredNotSent({requiredParams: ["userId", "productId", 'quantity']}), async (req, res, next) => {
    try {
      const {userId, productId, quantity} = req.body;
      const createdOrder = await createOrders({userId, productId, quantity});
      if(createdOrder) {
        res.send(createdOrder);
      } else {
        next({
          name: 'FailedToCreate',
          message: 'There was an error creating your routine'
        })
      }
    } catch (error) {
      next(error);
    }
});

apiRouter.patch('/:orderId', requireAdmin, requiredNotSent({requiredParams: ["userId", "productId", 'quantity'], atLeastOne: true}), async (req, res, next) => {
    try {
      const {userId, productId, quantity} = req.body;
      const {orderId} = req.params;
      const orderToUpdate = await getOrdersById(orderId);
      if(!orderToUpdate) {
        next({
          name: 'NotFound',
          message: `No order by ID ${orderId}`
        })
      } else {
        const updatedOrder = await updateOrder({id: orderId, userId, productId, quantity});
        if(updatedOrder) {
          res.send(updatedOrder);
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
  
apiRouter.delete('/:orderId', requireAdmin, async (req, res, next) => {
    try {
      const {orderId} = req.params;
      const orderToUpdate = await getOrdersById(orderId);
      if(!orderToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ${orderId}`
        })
      } else {
        const deletedOrder = await deleteOrder(orderId)
        res.send(`You Have Deleted product category ${orderId}, `, deletedOrder);
      }
    } catch (error) {
      next(error);
    }
});


module.exports = apiRouter