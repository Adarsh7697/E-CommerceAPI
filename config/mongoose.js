const mongoose = require("mongoose");

// connecting to the database
mongoose.connect(process.env.MONGOURL);

// accquiring the connection to check if it is successful
const db = mongoose.connection;

//checking for the error
db.on("error" , console.log.bind(console , "error in connecting the mongodb"));

//up and running then print the statement
db.once("open" , function() {
    console.log("Server connected to the successfully");
})

// exporting the connection 
module.exports = db;