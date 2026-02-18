const client = require('./client');

const util = require('./util');

async function createProduct({name, description, categoryId, inventory, product_tag, price, image_url}) {
    try {
      const {rows: [products]} = await client.query(`
        INSERT INTO products(name, description, "categoryId", inventory, product_tag, price, image_url) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `, [name, description, categoryId, inventory, product_tag, price, image_url]);
      return products;
    } catch (error) {
      throw error;
    }
}

async function getProductById(id){
  try {
    const {rows: [products]} = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [id]);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT * FROM products;
    `);
    return products
  } catch (error) {
    throw error
  }
}

async function updateProduct({id, ...fields}) {
  try {
  console.log("this is fields", fields)
    const toUpdate = {}
    for(let column in fields) {
      if(fields[column] !== undefined) 
      toUpdate[column] = fields[column];

    }
    console.log("to update", toUpdate)
    let products;
    if (util.dbFields(fields).insert.length > 0) {
      const {rows} = await client.query(`
          UPDATE products 
          SET ${ util.dbFields(toUpdate).insert }
          WHERE id=${ id }
          RETURNING *;
      `, Object.values(toUpdate));
      products = rows[0];
      return products;
    }
  } catch (error) {
    throw error;
  }
}


async function deleteProduct(id) {
  try {
    await client.query(`
        DELETE FROM cart 
        WHERE "productId" = $1;
    `, [id]);
    const {rows: [products]} = await client.query(`
        DELETE FROM products 
        WHERE id = $1
        RETURNING *
    `, [id]);
    return products;
  } catch (error) {
    throw error;
  }
}




//   async function getAllProductsByProdCategory({id}) {

//     try {
//       const { rows: products } = await client.query(`
//       SELECT * FROM products
//       WHERE categoryId = 
//       `,[id]);
//       return products
//     } catch (error) {
//       throw error
//     }
//   }



  module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
  }