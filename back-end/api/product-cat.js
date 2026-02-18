const express = require('express');
const apiRouter = express.Router();
const {getAllProductCategories, createProdCategory, getProdCategoryById, getProdCategoryByProduct, updateProductCat, deleteProductCat} = require('../db/product-cat');
const { requireAdmin, requiredNotSent } = require('./utils')

apiRouter.get('/', async(req, res, next)=>{
    try{
        const product_category = await getAllProductCategories();
        res.send(product_category);
    }catch (error){
        next(error);
    }
});

apiRouter.get('/:id', async (req, res, next) => {
    try {
        const product_category = await getProdCategoryById(req.params.id);
        res.send(product_category);
    } catch (error) {
        next(error);
    }
});


apiRouter.post('/', requireAdmin, requiredNotSent({requiredParams: ['name', 'description']}), async (req, res, next) => {
    try {
      const {name, description} = req.body;
      const createProductCat = await createProdCategory({name, description});
      if(createProductCat) {
        res.send(createProductCat);
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


apiRouter.patch('/:productCatId', requireAdmin, requiredNotSent({requiredParams: ['name', 'description'], atLeastOne: true}), async (req, res, next) => {
    try {
      const {name, description} = req.body;
      const {productCatId} = req.params;
      const productCatToUpdate = await getProdCategoryById(productCatId);
      if(!productCatToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ID ${productCatId}`
        })
      } else {
        const updatedProdCat = await updateProductCat({id: productCatId, name, description});
        if(updatedProdCat) {
          res.send(updatedProdCat);
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
  
apiRouter.delete('/:productCatId', requireAdmin, async (req, res, next) => {
    try {
      const {productCatId} = req.params;
      const productCatToUpdate = await getProdCategoryById(productCatId);
      if(!productCatToUpdate) {
        next({
          name: 'NotFound',
          message: `No product by ${productCatId}`
        })
      } else {
        const deletedProductCat = await deleteProductCat(productCatId)
        res.send(`You Have Deleted product category ${productCatId}, `, deletedProductCat);
      }
    } catch (error) {
      next(error);
    }
});


module.exports = apiRouter