const express = require("express");

require('dotenv').config();

const bodyParser = require("body-parser");

const db = require("./config/mongoose");

//port is an inbuilt programming interaface of class URL withing the url module is used to get and set the port portion of URL
const port = process.env.PORT || 5500;

//initializing express
const app = express();

// using body parser to parse over the request body
app.use(bodyParser.urlencoded({extended: true}));

// using routes
app.use('/products', require('./routes/products'));

// listen on port
app.listen(port , (err) => {
    if(err) {
        console.log(`Error in running the server ${err}`);
    }
    console.log(`API Is live on the localhost : ${port}`);
})