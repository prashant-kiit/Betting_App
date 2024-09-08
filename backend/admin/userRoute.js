import { Router } from "express";

const router = Router();

router.post("/placeBet", async (req, res) => {
  const bet = new Bet({
    matchId: req.body.matchId,
    betOn: req.body.betOn,
    amount: req.body.amount,
  });

  await bet.save();

  return res.status(200).send(bet.id);
});

export default router;
