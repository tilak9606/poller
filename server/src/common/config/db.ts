import {connect} from "mongoose";
import env from "./env.js";

export async function connectDB() {
    try {
        await connect(env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}