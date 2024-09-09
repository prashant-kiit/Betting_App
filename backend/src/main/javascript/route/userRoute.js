import { Router } from "express";
import Bet from "../model/bet.js";

const router = Router();

router.post("/placeBet", async (req, res) => {
  try {
    const bet = new Bet({
      matchId: req.body.matchId,
      betOn: req.body.betOn,
      amount: req.body.amount,
    });

    await bet.save();

    return res.status(200).send(bet.id);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

export default router;
