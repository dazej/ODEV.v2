const client = require('./client');
const util = require('./util');


async function getAllProductCategories(){
  try {
    const { rows: product_category } = await client.query(`
    SELECT * FROM product_category;
    `);
    return product_category
  } catch (error) {
    throw(error)
  }
}



async function createProdCategory({ name, description}) {
    try {
      const {rows: [product_category]} = await client.query(`
        INSERT INTO product_category(name, description) VALUES ($1, $2)
        RETURNING *;
      `, [name, description]);
      return product_category;
    } catch (error) {
      throw error;
    }
}

async function getProdCategoryById(id) {
    try {
      const {rows: [product_category]} = await client.query(`
        SELECT * FROM product_category
        WHERE id = $1;
      `, [id]);
      return product_category;
    } catch (error) {
      throw error;
    }
}

async function getProdCategoryByProduct(id) {
    try {
      const {rows: [product_category]} = await client.query(`
        SELECT categoryId FROM products
        WHERE categoryId = product_category.id;
      `, [id]);
      return product_category;
    } catch (error) {
      throw error;
    }
}

async function updateProductCat({id, ...fields}){
  try {
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let product_category;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE product_category 
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ id }
          RETURNING *;
      `, Object.values(toUpdate));
      product_category = rows[0];
      return product_category;
    }
  } catch (error) {
    throw error;
  }

}
async function deleteProductCat(id) {
  try {
    const {rows: [product_category]} = await client.query(`
        DELETE FROM product_category 
        WHERE id = $1
        RETURNING *
    `, [id]);
    return product_category;
  } catch (error) {
    throw error;
  }
}


  

module.exports = {
    createProdCategory,
    getProdCategoryById,
    getProdCategoryByProduct,
    getAllProductCategories,
    updateProductCat,
    deleteProductCat
}