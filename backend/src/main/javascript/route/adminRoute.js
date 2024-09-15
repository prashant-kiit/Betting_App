import { Router } from "express";
import {
  isMatchSchemaValid,
  saveMatch,
  setMatchStatus,
  updateMatch,
} from "../service/adminService.js";

const router = Router();

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
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.patch("/updateMatch/:matchId", async (req, res) => {
  try {
    const schemaValidationErrors = isMatchSchemaValid(req.body);

    if (schemaValidationErrors)
      return res
        .status(400)
        .send(`The data schema is not valid. ${schemaValidationErrors}`);

    const matchId = await updateMatch(req);

    return res.status(200).send(matchId);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.patch("/openMatch/:id", async (req, res) => {
  try {
    const match = setMatchStatus(req, "ACTIVE");

    if (!match) return res.status(404).send("Match Not found");

    return res.status(200).send("Match activated");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.patch("/closeMatch/:id", async (req, res) => {
  try {
    const match = setMatchStatus(req, "INACTIVE");

    if (!match) return res.status(404).send("Match Not found");

    return res.status(200).send("Match inactivated");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("bet_app_admin_token");
    return res.status(200).send("Admin logged out");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

export default router;
