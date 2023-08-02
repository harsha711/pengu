import { connect } from "mongoose";
import "dotenv/config";

export const connectDb = async () => {
    try {
        const conn = await connect(`${process.env.MONGO_URI}`);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
