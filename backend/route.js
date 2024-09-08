import { Router } from "express";
import Admin from "./model/admin.js";

const router = Router();

router.get("/admin/login", async (req, res) => {
  if (req.query.username === undefined)
    return res.status(401).send("Username not received");

  const admin = await Admin.find({
    username: req.query.username,
  });

  if (admin.length == 0) return res.status(401).send("Username not found");

  if (!(admin[0].password === req.query.password))
    return res.status(401).send("Password is incorrect");

  return res.status(200).send("Admin logged in");
});

router.get("/user/login", (req, res) => {
  console.log("Welcome to Home Page");
  res.status(200).send("Logged in to home page\n");
});

export default router;
