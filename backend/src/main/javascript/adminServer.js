import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database/database.js";
import adminLogin from "./route/adminLogin.js";
import adminAuth from "./middleware/adminAuth.js";
import adminRoute from "./route/adminRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const server = express();

server.use(
  cors({
    origin: `http://${process.env.DEV_CLIENT_DOMAIN}:${process.env.DEV_CLIENT_PORT}`,
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.use("/admin", adminLogin);
server.use("/admin", adminAuth, adminRoute);

server.use(errorHandler);

await dbconnect();

server.listen(
  process.env.DEV_ADMIN_SERVER_PORT,
  process.env.DEV_ADMIN_SERVER_DOMAIN,
  () => {
    console.log(
      `Admin Server is running on http://${process.env.DEV_ADMIN_SERVER_DOMAIN}:${process.env.DEV_ADMIN_SERVER_PORT}`
    );
  }
);
