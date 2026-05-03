import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    if (error.message.includes("querySrv")) {
      console.error(
        "DNS lookup failed. Try: 1) ipconfig /flushdns 2) Use a standard MongoDB connection string",
      );
    }
    process.exit(1);
  }
};

export default connectDB;
