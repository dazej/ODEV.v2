const express = require("express")
const app = express()
// able to read string
app.use(express.json())
// helps with security on localhost for now
const cors = require('cors')
app.use(cors())
// helps with deployment
require("dotenv").config()
const { PORT = 3000 } = process.env;

// init morgan
const morgan = require('morgan');
app.use(morgan('dev'));


const path = require('path');
app.use('/docs', express.static(path.join(__dirname, './front-end/odev-front-end')));
const client = require('./db/client');
client.connect();

const apiRouter = require("./api")
app.use("/", apiRouter)


// start the server
app.listen(PORT, ()=> {
    console.log("Server is up and running")
})