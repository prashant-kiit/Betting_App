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
} from "../service/userService.js";

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
    const schemaValidationErrors = isUserSchemaValid(req.body);

    if (schemaValidationErrors)
      return res
        .status(400)
        .send(`The data schema is not valid. ${schemaValidationErrors}`);

    const isMoneyCredited = await creditMoney(req);

    if (!isMoneyCredited) return res.status(400).send("Money not credited");

    return res.status(200).send("Money credited");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.post("/placeBet", async (req, res) => {
  try {
    const schemaValidationErrors = isBetSchemaValid(req.body);

    if (schemaValidationErrors)
      return res
        .status(400)
        .send(`The data schema is not valid. ${schemaValidationErrors}`);

    const user = await getUser(req);
    const match = await getMatch(req);

    if (!match) return res.status(404).send("The match is not found");

    if (!ifMatchActive(match))
      return res.status(400).send("The match is not active");

    if (!isTeamValid(req, match))
      return res
        .status(400)
        .send(
          `The team is not valid.Choose between ${match.team1} and ${match.team2}`
        );

    const isThisUsersFirstBet = await isThisUsersFirstBetOnTheMatch(
      user,
      match
    );
    if (!isThisUsersFirstBet)
      return res.status(400).send("You can only bet once on a match.");

    if (!(ifMoreThanMinimumAmount(req, match) && isLessThanWallet(req, user)))
      return res
        .status(400)
        .send(
          `The bet amount should aleast be ${match.minimumAmount} and should be less than your wallet ${user.wallet}`
        );

    const isPatchingDone = await patchMatch(req, match);

    if (!isPatchingDone)
      return res.status(400).send("The betOn value is invalid");

    const betId = await saveBet(req);

    await debitMoney(req, user);

    return res.status(201).send(betId);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

export default router;
