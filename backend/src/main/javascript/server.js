import express from "express";
import pkg from "express-openid-connect";
const { auth } = pkg;
import cors from "cors";
import cookieParser from "cookie-parser";
import dbconnect from "./database/database.js";
import adminLogin from "./route/adminLogin.js";
import adminAuth from "./middleware/adminAuth.js";
import adminRoute from "./route/adminRoute.js";
import userRoute from "./route/userRoute.js";

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
server.use(userRoute);

await dbconnect();

server.listen(8081, "localhost", () => {
  console.log("Server is running on http://localhost:8081");
});
