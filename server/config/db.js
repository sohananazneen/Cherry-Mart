import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error(
        "CRITICAL ERROR: MONGO_URI is not defined in environment variables.\n" +
          "Please check your .env file in the server directory.\n" +
          "If you haven't created one, you can copy .env.example to .env and add your connection string.",
      );
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoUri, {
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
