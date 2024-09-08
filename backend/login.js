import { Router } from "express";
import jwt from "jsonwebtoken";
import Admin from "./model/admin.js";

const router = Router();

router.get("/login", async (req, res) => {
  try {
    if (req.query.username === undefined)
      return res.status(401).send("Username not received");

    const admin = await Admin.find({
      username: req.query.username,
    });

    if (admin.length == 0) return res.status(401).send("Username not found");

    if (!(admin[0].password === req.query.password))
      return res.status(401).send("Password is incorrect");

    const token = jwt.sign(
      {
        username: admin[0].username,
      },
      "XYZ1234"
    );
    res.cookie("bet_app_token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).send("Admin logged in");
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

export default router;
