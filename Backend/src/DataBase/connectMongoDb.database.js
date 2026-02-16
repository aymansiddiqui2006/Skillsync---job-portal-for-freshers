import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connnectionRes=await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log(`MongoDB connected !! DB host ${connnectionRes.connection.host}`);
  } catch (error) {
    console.log("Could not connect to MongoDB: ", error);
    process.exit(1);
  }
};

export default ConnectDB;