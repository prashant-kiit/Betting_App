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
import { MatchInactiveError } from "../ErrorHandling/MatchError.js";
import {
  NotTheFirstBetError,
  TeamInvalidError,
} from "../ErrorHandling/ResultError.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const user = await saveUser(req);
    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.get("/matches", async (req, res, next) => {
  try {
    const matches = await getAllMatch();
    return res.status(200).send(matches);
  } catch (error) {
    next(error);
  }
});

router.put("/addMoney", async (req, res, next) => {
  try {
    isUserSchemaValid(req.body);

    await creditMoney(req);

    return res.status(200).send("Money credited.");
  } catch (error) {
    next(error);
  }
});

router.get("/prospect", async (req, res, next) => {
  try {
    const match = await getMatch(req.query.matchId);

    if (!isTeamValid(req.query.betOn, match))
      throw new TeamInvalidError(match, betOn);

    const potentialAmount = getWinProspects(match, req.query.betOn);

    return res.status(200).send(`${potentialAmount}`);
  } catch (error) {
    next(error);
  }
});

router.post("/placeBet", async (req, res, next) => {
  try {
    isBetSchemaValid(req.body);

    const user = await getUser(req.body.userId);

    const match = await getMatch(req.body.matchId);

    const isMatchActive = ifMatchActive(match.status);

    if (!isMatchActive) throw new MatchInactiveError(req.body.matchId);

    if (!isTeamValid(req.body.betOn, match))
      throw new TeamInvalidError(match, req.body.betOn);

    const isThisUsersFirstBet = await isThisUsersFirstBetOnTheMatch(
      user.email,
      match._id
    );
    if (!isThisUsersFirstBet) throw new NotTheFirstBetError(req.body.matchId);

    if (
      !(
        ifMoreThanMinimumAmount(req.body.amount, match.minimumAmount) &&
        isLessThanWallet(req.body.amount, user.wallet)
      )
    )
      throw new NotTheFirstBetError(
        req.body.matchId,
        match.minimumAmount,
        user.wallet
      );

    const isPatchingDone = await patchMatch(req, match);

    if (!isPatchingDone)
      return res.status(400).send("The betOn value is invalid.");

    const bet = await saveBet(req);

    await debitMoney(req, user);

    return res.status(201).send(bet);
  } catch (error) {
    next(error);
  }
});

export default router;
