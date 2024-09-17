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
    origin: "http://localhost:3000",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.use("/admin", adminLogin);
server.use("/admin", adminAuth, adminRoute);

server.use(errorHandler);

await dbconnect();

server.listen(8080, "localhost", () => {
  console.log("Admin Server is running on http://localhost:8080");
});
