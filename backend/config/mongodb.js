import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    });

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL environment variable is not set");
    }

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/ecommerce`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

export default connectDB;
