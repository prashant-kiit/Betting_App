export const userAuth = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    // jwt.verify();
    // next();
  } else {
    // return res.clearCookie().status(401).send("Invalid User");
  }
};
