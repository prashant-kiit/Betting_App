import { Router } from "express";
import {
  isMatchSchemaValid,
  saveMatch,
  setMatchStatus,
} from "../service/adminService.js";

const router = Router();

// validate
// service

router.post("/createMatch", async (req, res) => {
  try {
    const schemaValidationErrors = isMatchSchemaValid(req.body);

    if (schemaValidationErrors)
      return res
        .status(400)
        .send(`The data schema is not valid. ${schemaValidationErrors}`);

    const matchId = await saveMatch(req);

    return res.status(201).send(matchId);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/openMatch/:id", async (req, res) => {
  try {
    const match = setMatchStatus(req, "ACTIVE");

    if (!match) return res.status(404).send("Match Not found");

    return res.status(200).send("Match activated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/closeMatch/:id", async (req, res) => {
  try {
    const match = setMatchStatus(req, "INACTIVE");

    if (!match) return res.status(404).send("Match Not found");

    return res.status(200).send("Match inactivated");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("bet_app_token");
    return res.status(200).send("Admin logged out");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
