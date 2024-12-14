const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//     if (!req.session.isLoggedIn) {
//         return res.redirect('/login');
//     }
//     next();
// }

// rest api

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) res.sendStatus(400).send("Token not present");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.user = user;
      next();
    }
  });
};
// end rest api
