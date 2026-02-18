const client = require('./client');
const { getUserByUsername } = require('./users')


async function createMailingAddress({userId, street, city, state}) {
    try {
      const {rows: [mailing_address]} = await client.query(`
      INSERT INTO mailing_address ("userId", street, city, state)
      VALUES($1, $2, $3, $4)
      RETURNING *;
  `, [userId, street, city, state]);
      return mailing_address;
    } catch (error) {
      throw error;
    }
  }

  async function getMailingAddressById(id){
    try {
      const {rows: [mailing_address]} = await client.query(`
        SELECT * FROM mailing_address
        WHERE id = $1
      `, [id]);
      return mailing_address;
    } catch (error) {
      throw error;
    }
  }

  async function getAllMailingAddress() {
    try {
      const { rows: mailing_address } = await client.query(`
      SELECT * FROM mailing_address
      `);
      return mailing_address
    } catch (error) {
      throw error
    }
  }

  async function getMailingAddressByUser({username}) {
    try {
      const user = await getUserByUsername(username);
      const { rows: mailing_address } = await client.query(`
      SELECT * FROM mailing_address
      FROM users
      WHERE user.username = $2
      `, [user.id]);
      return attachActivitiesToRoutines(routines);
    } catch (error) {
      throw error
    }
  }






  module.exports = {
    createMailingAddress,
    getMailingAddressById,
    getAllMailingAddress,
    getMailingAddressByUser
  }