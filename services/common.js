const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmMyNDlkN2ZkZjExNmQ5MjcxODc5MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MjQ2MDQ1fQ.FNyLaYLLnvO36sqUZPoz5zey_UvO0g0PqLfYmDJjcvI"
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIzMmYwNDMwN2FkMzI5ZTcwNDE5OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MTg0MTc2fQ.gdJWqmsil4ARMqfbelR9Tmx2enA3yu9S1rXAXnErquQ";

  return token;
};

//token =
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmMyNDlkN2ZkZjExNmQ5MjcxODc5MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MjQ2MDQ1fQ.FNyLaYLLnvO36sqUZPoz5zey_UvO0g0PqLfYmDJjcvI"
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIzMmYwNDMwN2FkMzI5ZTcwNDE5OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MTg0MTc2fQ.gdJWqmsil4ARMqfbelR9Tmx2enA3yu9S1rXAXnErquQ";
