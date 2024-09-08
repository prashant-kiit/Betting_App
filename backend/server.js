import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database.js";
import adminLogin from "./admin/adminLogin.js";
import adminRoute from "./admin/adminRoute.js";
import adminAuth from "./middleware/adminAuth.js";

const server = express();
server.use(
  cors({
    origin: "http://localhost:8081",
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());
server.use("/admin", adminLogin);
server.use("/admin", adminAuth, adminRoute);

dbconnect();

server.listen(8081, "localhost", () => {
  console.log("Server is running on http://localhost:8081");
});
