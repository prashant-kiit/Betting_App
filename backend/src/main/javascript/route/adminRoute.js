import { Router } from "express";
import Match from "../model/match.js";

const router = Router();

router.post("/createMatch", async (req, res) => {
  try {
    const match = new Match({
      team1: req.body.team1,
      team2: req.body.team2,
      minimumAmount: req.body.minimumAmount,
    });

    await match.save();

    return res.status(200).send(match.id);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.patch("/closeMatch/:id", async (req, res) => {
  try {
    const match = await Match.findOneAndUpdate(
      {
        _id: new Object(req.params.id),
      },
      {
        status: "INACTIVE",
      }
    );

    if (!match) return res.status(404).send("Match Not found");

    return res.status(200).send("Match updated");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("Match_app_token");
    return res.status(200).send("Admin logged out");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
