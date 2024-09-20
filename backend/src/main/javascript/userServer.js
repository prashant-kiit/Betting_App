import console from "console";
import process from "process";
import dotenv from "dotenv";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database/database.js";
import userRoute from "./route/userRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config({ path: `.env-${process.env.ENV}` });

const server = express();

const userAuth = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUERBASEURL,
  tokenSigningAlg: process.env.SIGNALG,
});

server.use(
  cors({
    origin: `http://${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}`,
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.use(userAuth, userRoute);

server.use(errorHandler);

await dbconnect();

server.listen(
  process.env.USER_SERVER_PORT,
  process.env.USER_SERVER_DOMAIN,
  () => {
    console.log(
      `User Server is running on http://${process.env.USER_SERVER_DOMAIN}:${process.env.USER_SERVER_PORT}`
    );
  }
);
