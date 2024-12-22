const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/Abhishek";  //creates "user" collection in "Abhishek" Database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully!");
    
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectToMongo;
