import { Router } from "express";
import {
  getMatch,
  ifLessThanMinimumAmount,
  saveBet,
  patchMatch,
  ifMatchActive,
  isBetSchemaValid,
  saveUser,
} from "../service/userService.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await saveUser(req);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
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

    const match = await getMatch(req);

    if (!match) return res.status(404).send("The match is not found");

    if (!ifMatchActive(match))
      return res.status(400).send("The match is not active");

    if (ifLessThanMinimumAmount(req, match))
      return res
        .status(400)
        .send(`The bet amount should aleast be ${match.minimumAmount}`);

    const isPatchingDone = await patchMatch(req, match);

    if (!isPatchingDone)
      return res.status(400).send("The betOn value is invalid");

    const betId = await saveBet(req);

    return res.status(201).send(betId);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
