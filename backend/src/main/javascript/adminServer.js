import console from "console";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: `.env-${process.env.ENV}` });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database/database.js";
import adminLogin from "./route/adminLogin.js";
import adminAuth from "./middleware/adminAuth.js";
import adminRoute from "./route/adminRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const server = express();

server.use(
  cors({
    origin: `http://${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`,
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
  process.env.ADMIN_SERVER_PORT,
  process.env.ADMIN_SERVER_DOMAIN,
  () => {
    console.log(
      `Admin Server is running on http://${process.env.ADMIN_SERVER_DOMAIN}:${process.env.ADMIN_SERVER_PORT}`
    );
  }
);
