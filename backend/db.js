const mongoose = require("mongoose");
// const mongoUri = "mongodb://localhost:27017"
const mongoUri = "mongodb://127.0.0.1/inotebook"

const connectToMongo = ()=>{
    // mongoose.connect(mongoUri, ()=>{
    //     console.log("Connected to Mongo successfully, this is a callback function")
    // })
    mongoose.connect(mongoUri)
}

module.exports = connectToMongo;