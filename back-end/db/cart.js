const client = require('./client');
const util = require('./util')

async function createCart({userId, productId, quantity}) {
    try {
      const {rows: [cart]} = await client.query(`
        INSERT INTO cart ("userId", "productId", quantity)
        VALUES($1, $2, $3)
        RETURNING *;
      `, [userId, productId, quantity]);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async function getCartById(id){
    try {
      const {rows: [orders]} = await client.query(`
        SELECT * FROM cart
        WHERE id = $1
      `, [id]);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async function getCartByUserId(userId){
    try {
      const {rows} = await client.query(`
        SELECT * FROM cart
        WHERE "userId" = $1
      `, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  
  async function getAllCarts() {
    try {
      const { rows: cart } = await client.query(`
      SELECT * FROM cart;
      `);
      return cart
    } catch (error) {
      throw error
    }
  }
  
  async function updateCarts({id, ...fields}) {
    try {
      const toUpdate = {}
      for(let column in fields) {
        if(fields[column] !== undefined) toUpdate[column] = fields[column];
      }
      let cart;
      if (util.dbFields(fields).insert.length > 0) {
        const {rows} = await client.query(`
            UPDATE cart 
            SET ${ util.dbFields(toUpdate).insert }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
        cart = rows[0];
        return cart;
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  async function deleteCart(id) {
    try {
      const {rows: [cart]} = await client.query(`
          DELETE FROM cart 
          WHERE id = $1
          RETURNING *
      `, [id]);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  
  







  module.exports = {
    createCart,
    getCartById,
    getAllCarts,
    updateCarts,
    deleteCart,
    getCartByUserId
  }