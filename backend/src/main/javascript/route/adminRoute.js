import { Router } from "express";
import {
  isMatchSchemaValid,
  saveMatch,
  setMatchStatus,
  updateMatch,
  playMatch,
  getResult,
  distributeMoney,
} from "../service/adminService.js";
import { getMatch } from "../service/userService.js";
import { MatchNotFound } from "../ErrorHandling/MatchError.js";

const router = Router();

router.post("/createMatch", async (req, res, next) => {
  try {
    isMatchSchemaValid(req.body);

    const matchId = await saveMatch(req);

    return res.status(201).send(matchId);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateMatch/:matchId", async (req, res) => {
  try {
    isMatchSchemaValid(req.body);

    await getMatch(req.params.matchId);

    const match = await updateMatch(req);

    return res.status(200).send(match);
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/matchResult/:matchId", async (req, res) => {
  try {
    await getMatch(req.params.matchId);

    if (match.status === "INACTIVE")
      return res.status(400).send("Match is already inactive.");

    await setMatchStatus(match.id, "INACTIVE");

    const winnerTeam = playMatch(match);

    const { winners, amountPerWinner, adminShare } = await getResult(
      winnerTeam,
      match
    );

    if (winners.length === 0)
      return res
        .status(400)
        .send("No one won the bet. No money will be distributed.");

    const { winnersUpdated, adminUpdated } = await distributeMoney(
      winners,
      amountPerWinner,
      req.body.adminUsername,
      adminShare
    );

    return res.status(200).send({ winnersUpdated, adminUpdated });
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/openMatch/:id", async (req, res) => {
  try {
    await setMatchStatus(req.params.id, "ACTIVE");

    return res.status(200).send("Match activated.");
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    return res.status(500).send(error.message);
  }
});

router.patch("/closeMatch/:id", async (req, res) => {
  try {
    await setMatchStatus(req.params.id, "INACTIVE");

    return res.status(200).send("Match inactivated.");
  } catch (error) {
    console.error(error);
    if (error instanceof MatchNotFound)
      return res.status(error.httpCode).send(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("bet_app_admin_token");
    req.body.adminUsername = null;
    return res.status(200).send("Admin logged out.");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

export default router;
