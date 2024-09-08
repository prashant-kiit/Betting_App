import express from "express";
import router from "./route.js";
import dbconnect from "./database.js";

const server = express();
server.use(express.json());
server.use(router);

dbconnect();

server.listen(8081, "localhost", () => {
    console.log("Server is running on http://localhost:8081");
})