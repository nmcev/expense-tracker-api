require('dotenv').config();
import { connect } from "mongoose";
const mongooseUri = process.env.MONGO_URI;

async function connectToMongoDB() {

  try {
    await connect(mongooseUri);
    console.log(`MongoDB successfully connected ${mongooseUri}`);

  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }

}

export default connectToMongoDB;

