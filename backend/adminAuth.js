import Admin from "./model/admin";

const adminAuth = async (req, res, next) => {
  console.log("Admin Auth Middleware");

  const admin = await Admin.find({
    username: req.body.username,
    password: req.body.password,
  });

  
  next();
};

export default auth;
