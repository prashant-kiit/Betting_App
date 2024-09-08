import { Router } from "express";

const router = Router();

router.get("/home", async (req, res) => {
  res.status(200).send("Welcome to Page");
});

export default router;
