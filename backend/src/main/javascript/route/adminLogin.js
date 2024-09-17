import { Router } from "express";
import {
  isAdminSchemaValid,
  getAdmin,
  isPasswordCorrect,
  getAdminToken,
} from "../service/adminService.js";
import { PasswordIncorrect } from "../ErrorHandling/AuthError.js";

const router = Router();

router.get("/login", async (req, res, next) => {
  try {
    isAdminSchemaValid(req.query);

    const admin = await getAdmin(req);

    const isPassCorrect = isPasswordCorrect(req, admin);

    if (!isPassCorrect) throw new PasswordIncorrect(admin.username);

    const token = getAdminToken(admin);

    res.cookie("bet_app_admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).send("Admin logged in");
  } catch (error) {
    next(error);
  }
});

export default router;
