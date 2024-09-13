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
// master
const server = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "6de0301c51f1bf2bd52075b64daccd3db29c885d04de4310d2b4276f07ce8ce",
  baseURL: "http://localhost:8081",
  clientID: "fdEbeHTMJBZH0kdwhxNJ5OvDS3Z2dXuk",
  issuerBaseURL: "https://dev-vl5s6zif0qwkov3t.us.auth0.com",
};

server.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true,
  })
);
server.use(auth(config));
server.use(cookieParser());
server.use(express.json());

server.use("/admin", adminLogin);
server.use("/admin", adminAuth, adminRoute);
server.use(userRoute);

await dbconnect();

server.listen(8081, "localhost", () => {
  console.log("Server is running on http://localhost:8081");
});
