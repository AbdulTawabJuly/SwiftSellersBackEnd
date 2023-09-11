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
  //token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIzMmYwNDMwN2FkMzI5ZTcwNDE5OSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0NDE3MTUxfQ.nkBrJDqmW2KLBtDbS83d-d8Gcxp14y9WI1tsEaYkTAs";
  return token;
};
