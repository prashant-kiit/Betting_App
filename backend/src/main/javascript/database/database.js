import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();
const connection_string = `mongodb+srv://${process.env.DEV_MONGODB_USERNAME}:${process.env.DEV_MONGODB_PASSWORD}@betting-app-cluster0.1v9es.mongodb.net/?retryWrites=true&w=majority&appName=Betting-App-Cluster0`;

const dbconnect = async () => {
  try {
    await connect(connection_string);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database-Error");
    console.log(error);
  }
};

export default dbconnect;
