export const userAuth = (req, res, next) => {
  if (req.oidc.isAuthenticated()) {
    next();
  } else {
    return res.status(301).redirect("http://localhost:8081/app/logout");
  }
};
