// THIS FILE IS USED FOR MONGODB Or Mongoose CONNECTION

const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(mongoURI);
        console.log("Connected to mongo Successfully");
    } catch (error) {
        console.log(error);
        process.exit()
    }
}

module.exports = connectToMongo;