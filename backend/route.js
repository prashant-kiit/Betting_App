import { Router } from "express";

const router = Router();

router.get("/home", (req, res) => {
  console.log("Welcome to Home Page");
  res.status(200).send("Logged in to home page\n");
});

export default router;