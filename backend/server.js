import express from "express";
import router from "./route.js";

const server = express();
server.use(router);

server.listen(8081, "localhost", () => {
    console.log("Server is running on http://localhost:8081");
})