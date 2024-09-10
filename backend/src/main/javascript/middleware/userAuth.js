export const userAuth = (req, res, next) => {
  console.log("Auth");
  console.log(req.oidc.isAuthenticated());
  if (req.oidc.isAuthenticated()) {
    next();
  } else {
    return res.status(301).redirect("http://localhost:3000/user/logout");
  }
};
