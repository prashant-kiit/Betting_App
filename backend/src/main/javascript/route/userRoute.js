import { Router } from "express";
import {
  getAllMatch,
  getMatch,
  getUser,
  isTeamValid,
  isThisUsersFirstBetOnTheMatch,
  ifMoreThanMinimumAmount,
  isLessThanWallet,
  saveBet,
  patchMatch,
  ifMatchActive,
  isBetSchemaValid,
  saveUser,
  isUserSchemaValid,
  creditMoney,
  debitMoney,
  getWinProspects,
} from "../service/userService.js";
import { ClientError } from "../ErrorHandling/SchemaError.js";
import { MatchInactiveError } from "../ErrorHandling/MatchError.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await saveUser(req);
    return res.status(201).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.get("/matches", async (req, res) => {
  try {
    const matches = await getAllMatch();
    return res.status(200).send(matches);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.put("/addMoney", async (req, res) => {
  try {
    isUserSchemaValid(req.body);

    await creditMoney(req);

    return res.status(200).send("Money credited.");
  } catch (error) {
    console.error(error);
    if (error instanceof ClientError) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send(error.message);
  }
});

router.get("/prospect", async (req, res) => {
  try {
    await getMatch(req.query.matchId);

    if (!isTeamValid(req.query.betOn, match))
      return res
        .status(400)
        .send(
          `The team is not valid. Choose between ${match.team1} and ${match.team2}.`
        );

    const potentialAmount = getWinProspects(match, req.query.betOn);

    return res.status(200).send(`${potentialAmount}`);
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    return res.status(500).send(error.message);
  }
});

router.post("/placeBet", async (req, res) => {
  try {
    isBetSchemaValid(req.body);

    const user = await getUser(req.body.userId);
    
    await getMatch(req.body.matchId);

    ifMatchActive(match.status);

    if (!isTeamValid(req.body.betOn, match))
      return res
        .status(400)
        .send(
          `The team is not valid. Choose between ${match.team1} and ${match.team2}.`
        );

    const isThisUsersFirstBet = await isThisUsersFirstBetOnTheMatch(
      user.email,
      match._id
    );
    if (!isThisUsersFirstBet)
      return res.status(400).send("You can only bet once on a match.");

    if (
      !(
        ifMoreThanMinimumAmount(req.body.amount, match.minimumAmount) &&
        isLessThanWallet(req.body.amount, user.wallet)
      )
    )
      return res
        .status(400)
        .send(
          `The bet amount should aleast be ${match.minimumAmount} and should be less than your wallet ${user.wallet}.`
        );

    const isPatchingDone = await patchMatch(req, match);

    if (!isPatchingDone)
      return res.status(400).send("The betOn value is invalid.");

    const bet = await saveBet(req);

    await debitMoney(req, user);

    return res.status(201).send(bet);
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    if (error instanceof MatchInactiveError)
      return res.status(error.httpCode).send(error.message);
    if (error instanceof ClientError)
      return res.status(400).send(error.message);
    return res.status(500).send(error.message);
  }
});

export default router;
