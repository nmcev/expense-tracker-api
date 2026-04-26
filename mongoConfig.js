require('dotenv').config();
const mongoose = require("mongoose");
const mongooseUri = process.env.MONGO_URI;

async function connectToMongoDB() {

    try { 
        await mongoose.connect(mongooseUri);
        console.log(`MongoDB successfully connected ${mongooseUri}`);

    } catch (e) { 
      console.error('Error connecting to MongoDB:', e);
    }

}

module.exports = connectToMongoDB;

