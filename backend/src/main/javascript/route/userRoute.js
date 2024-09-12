import { Router } from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  getMatch,
  ifLessThanMinimumAmount,
  saveBet,
  patchMatch,
  ifMatchActive,
  isBetSchemaValid,
} from "../service/userService.js";

const router = Router();

router.get("/status", (req, res) => {
  try {
    console.log("Status");

    return res
      .status(200)
      .send(req.oidc.isAuthenticated() ? "User logged in" : "User logged out");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/signin", (req, res) => {
  try {
    console.log("Signin");
    return res.status(301).redirect("http://localhost:8081/login");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/signout", (req, res) => {
  try {
    console.log("Signout");
    return res.status(301).redirect("http://localhost:8081/logout");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/", userAuth, async (req, res) => {
  try {
    return res.status(301).redirect("http://localhost:8081/app/dashboard");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/test", userAuth, (req, res) => {
  console.log("Test Done");
  return res.status(200).send("Test Done");
});

router.post("/placeBet", userAuth, async (req, res) => {
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

    return res.status(200).send(betId);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
