const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const databaseConnection = () => {
    mongoose
    .connect(process.env.MONGO_URL)
    .then( () => {
        console.log("Mongodb Connected Successfully !");
    })
    .catch( (error) => {
        console.log("error");
    })
};

module.exports = databaseConnection;