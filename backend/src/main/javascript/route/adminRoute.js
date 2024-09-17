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
import { MatchInactiveError } from "../ErrorHandling/MatchError.js";
import { NoWinnerError } from "../ErrorHandling/ResultError.js";

const router = Router();

router.post("/createMatch", async (req, res, next) => {
  try {
    isMatchSchemaValid(req.body);

    const match = await saveMatch(req);

    return res.status(201).send(match);
  } catch (error) {
    next(error);
  }
});

router.patch("/updateMatch/:matchId", async (req, res, next) => {
  try {
    isMatchSchemaValid(req.body);

    await getMatch(req.params.matchId);

    const match = await updateMatch(req);

    return res.status(200).send(match);
  } catch (error) {
    next(error);
  }
});

router.get("/matchResult/:matchId", async (req, res, next) => {
  try {
    const match = await getMatch(req.params.matchId);

    if (match.status === "INACTIVE") throw new MatchInactiveError(match.id);

    await setMatchStatus(req.params.matchId, "INACTIVE");

    const winnerTeam = playMatch(match);

    const { winners, amountPerWinner, adminShare } = await getResult(
      winnerTeam,
      match
    );

    if (winners.length === 0) throw new NoWinnerError(req.params.matchId);

    const { winnersUpdated, adminUpdated } = await distributeMoney(
      winners,
      amountPerWinner,
      req.body.adminUsername,
      adminShare
    );

    return res.status(200).send({ winnersUpdated, adminUpdated });
  } catch (error) {
    next(error);
  }
});

router.patch("/openMatch/:id", async (req, res, next) => {
  try {
    await setMatchStatus(req.params.id, "ACTIVE");

    return res.status(200).send("Match activated.");
  } catch (error) {
    next(error);
  }
});

router.patch("/closeMatch/:id", async (req, res, next) => {
  try {
    await setMatchStatus(req.params.id, "INACTIVE");

    return res.status(200).send("Match inactivated.");
  } catch (error) {
    next(error);
  }
});

router.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("bet_app_admin_token");
    req.body.adminUsername = null;
    return res.status(200).send("Admin logged out.");
  } catch (error) {
    next(error);
  }
});

export default router;
