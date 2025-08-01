import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`mongodb connceted , Host :${connectionInstance.connection.name}`);

    } catch (error) {
        console.error("Mongodb connection erroe", error);
        process.exit(1);
    }
};

export default connectDB