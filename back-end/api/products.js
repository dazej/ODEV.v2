const express = require('express');
const apiRouter = express.Router();
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../db/products');
const { requireAdmin, requiredNotSent } = require('./utils')


apiRouter.get('/', async(req, res, next)=>{
    try{
        const products = await getAllProducts();
        res.send(products);
    }catch (error){
        next(error);
    }
});

apiRouter.get('/:id', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        res.send(product);
    } catch (error) {
        next(error);
    }
});


apiRouter.post('/', requireAdmin, requiredNotSent({requiredParams: ['name', 'description', "categoryId", 'inventory', 'product_tag', 'price', 'image_url']}), async (req, res, next) => {
    try {
      const {name, description, categoryId, inventory, product_tag, price, image_url} = req.body;
      const createProducts = await createProduct({name, description, categoryId, inventory, product_tag, price, image_url});
      if(createProducts) {
        res.send(createProducts);
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

// apiRouter.put('/:id', async (req, res, next) => {
//     try {
//         const id = req.params.id
//         const product = await updateProduct(id, req.body);
//         console.log(videoGame)
        
//         res.send(videoGame);
//     } catch (error) {
//         next(error);
//     }
// });


apiRouter.patch('/:productId', requireAdmin, requiredNotSent({requiredParams: ['name', 'description', "categoryId", 'inventory', 'product_tag', 'price', 'image_url'], atLeastOne: true}), async (req, res, next) => {
    try {
      const {name, description, categoryId, inventory, product_tag, price, image_url} = req.body;
      const {productId} = req.params;
      const productToUpdate = await getProductById(productId);
      if(!productToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ID ${productId}`
        })
      } else {
        const updatedRoutine = await updateProduct({id: productId, name, description, categoryId, inventory, product_tag, price, image_url});
        if(updatedRoutine) {
          res.send(updatedRoutine);
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
  
apiRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
    try {
      const {productId} = req.params;
      const productToUpdate = await getProductById(productId);
      if(!productToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ${productId}`
        })
      } else {
        const deletedProduct = await deleteProduct(productId)
        // res.send(`You Have Deleted routine ${productId}, ` + deletedProduct);
        res.send({message: "youre okay"})
      }
    } catch (error) {
      next(error);
    }
});



module.exports = apiRouter

//howdy