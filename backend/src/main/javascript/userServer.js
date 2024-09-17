import dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database/database.js";
import userRoute from "./route/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const server = express();

const userAuth = auth({
  audience: process.env.DEV_AUDIENCE,
  issuerBaseURL: process.env.DEV_ISSUERBASEURL,
  tokenSigningAlg: process.env.DEV_SIGNALG,
});

server.use(
  cors({
    origin: `http://${process.env.DEV_CLIENT_DOMAIN}:${process.env.DEV_CLIENT_PORT}`,
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.use(userAuth, userRoute);

server.use(errorHandler);

await dbconnect();

server.listen(
  process.env.DEV_USER_SERVER_PORT,
  process.env.DEV_USER_SERVER_DOMAIN,
  () => {
    console.log(
      `User Server is running on http://${process.env.DEV_USER_SERVER_DOMAIN}:${process.env.DEV_USER_SERVER_PORT}`
    );
  }
);
