const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoURL =
  process.env.MONDODB_URL ||
  " ";


const connectMongos = () => {
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectMongos;
