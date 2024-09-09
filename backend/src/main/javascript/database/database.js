import { connect } from "mongoose";

const connection_string =
  "mongodb+srv://prashantsingh090798:rbQ7B5m0GHVpRSN8@betting-app-cluster0.1v9es.mongodb.net/?retryWrites=true&w=majority&appName=Betting-App-Cluster0";

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