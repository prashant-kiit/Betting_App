import { Router } from "express";
import {
  isAdminSchemaValid,
  getAdmin,
  isPasswordCorrect,
  getAdminToken,
} from "../service/adminService.js";
const router = Router();

router.get("/login", async (req, res) => {
  try {
    const schemaValidationErrors = isAdminSchemaValid(req.query);

    if (schemaValidationErrors)
      return res
        .status(400)
        .send(`The data schema is not valid. ${schemaValidationErrors}`);

    const admin = await getAdmin(req);

    if (!admin) return res.status(404).send("Username not found");

    if (!isPasswordCorrect(req, admin))
      return res.status(401).send("Password is incorrect");

    const token = getAdminToken(admin);

    res.cookie("bet_app_admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).send("Admin logged in");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.message);
  }
});

export default router;
