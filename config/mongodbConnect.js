const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://ubnkantah:ubnkantah2024@cluster0.cvsgc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Database Connected");
  } catch (err) {
    console.log(`Database connection error, ${err}`);
  }
};

module.exports = connectMongoDB;