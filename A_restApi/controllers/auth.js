const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

// accessTokens
function generateAccessToken(user) {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "150m",
  });
  return token;
}
// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "200m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

// https://medium.com/@prashantramnyc/authenticate-rest-apis-in-node-js-using-jwt-json-web-tokens-f0e97669aad3
// add refresh token functionality as well
exports.postLogin = (req, res, next) => {
  const { email, password, role = "User" } = req.value.body;

  User.findOne({ email: email })
    .then(async (user) => {
      if (user == null) res.status(404).send("User does not exist!");
      await bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            const accessToken = generateAccessToken({ user: req.body.email, role: [] });
            const refreshToken = generateRefreshToken({ user: req.body.email });
            return res.json({
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          }
        })
        .catch((err) => {
          res.status(401).send("Password Incorrect!");
        });
    })
    .catch((error) => {
      return next(error);
    });
};

exports.postSingUp = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    email: email,
    password: hashedPassword,
    cart: { items: [] },
  });
  return user
    .save()
    .then((response) => {
      res.status(200).send({ status: "Ok" });
    })
    .catch
    // handle err
    ();
};
