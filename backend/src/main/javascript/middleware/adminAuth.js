import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const payload = jwt.verify(req.cookies.bet_app_admin_token, "XYZ1234");
    req.body.adminUsername = payload.username;
    next();
  } catch (error) {
    res.clearCookie("bet_app_token");
    return res
      .status(401)
      .send(
        "Invalid user. Check if you are Logged in or not. If logged in then check if token is correct or not."
      );
  }
};

export default adminAuth;
