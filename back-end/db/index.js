module.exports = {
  // ...require('./client'), // adds key/values from users.js
  ...require('./users'), // adds key/values from users.js
  ...require('./products'), // adds key/values 
  ...require('./address'), // etc
  ...require('./orders'), // etc
  ...require('./cart'), // etc
  ...require('./product-cat') // etc
}