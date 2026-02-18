const client = require('./client');
const util = require('./util')

async function createOrders({userId, productId, quantity}) {
    try {
      const {rows: [orders]} = await client.query(`
        INSERT INTO orders ("userId", "productId", quantity)
        VALUES($1, $2, $3)
        RETURNING *;
      `, [userId, productId, quantity]);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async function getOrdersById(id){
    try {
      const {rows: [orders]} = await client.query(`
        SELECT * FROM orders
        WHERE id = $1
      `, [id]);
      return orders;
    } catch (error) {
      throw error;
    }
  }

  async function getOrdersByUserId(userId){
    try {
      const {rows} = await client.query(`
        SELECT * FROM orders
        WHERE "userId" = $1
      `, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }


  
  async function getAllOrders() {
    try {
      const { rows } = await client.query(`
      SELECT * FROM orders;
      `);
      return rows
    } catch (error) {
      throw error
    }
  }
  
  async function updateOrder({id, ...fields}) {
    try {
      const toUpdate = {}
      for(let column in fields) {
        if(fields[column] !== undefined) toUpdate[column] = fields[column];
      }
      let orders;
      if (util.dbFields(fields).insert.length > 0) {
        const {rows} = await client.query(`
            UPDATE orders 
            SET ${ util.dbFields(toUpdate).insert }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(toUpdate));
        orders = rows[0];
        return orders;
      }
    } catch (error) {
      throw error;
    }
  }
  
  
  async function deleteOrder(id) {
    try {
      const {rows: [orders]} = await client.query(`
          DELETE FROM orders 
          WHERE id = $1
          RETURNING *
      `, [id]);
      return orders;
    } catch (error) {
      throw error;
    }
  }
  
  

  module.exports = {
    createOrders,
    getOrdersById,
    getOrdersByUserId,
    getAllOrders,
    updateOrder,
    deleteOrder
  }