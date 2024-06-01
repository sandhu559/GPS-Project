const dotenv = require('dotenv');
const mongoose = require("mongoose");


dotenv.config(); // Load environment variables from .env file

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Its Wroking!');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    throw err;
    
  }
};


module.exports = connectToDb;
