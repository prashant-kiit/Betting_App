import { Router } from "express";
import jwt from "jsonwebtoken";
import Admin from "../model/admin.js";

const router = Router();

// validate
// service

router.get("/login", async (req, res) => {
  try {
    const admin = await Admin.findOne({
      username: req.query.username,
    });

    if (!admin) return res.status(401).send("Username not found");

    if (!(admin.password === req.query.password))
      return res.status(401).send("Password is incorrect");

    const token = jwt.sign(
      {
        username: admin.username,
      },
      "XYZ1234"
    );

    res.cookie("bet_app_token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).send("Admin logged in");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
