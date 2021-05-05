require("dotenv").config();
const LocalStrategy = require("passport-local");
const jwt = require("jwt-simple");

const { UserDB } = require("../../user/models/UserDB");

const opts = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
  session: false,
};

module.exports = new LocalStrategy(opts, async (req, email, password, done) => {
  UserDB.checkPassword(email, password)
    .then((checkPasswordResponse) => {
      if (!checkPasswordResponse.flag) {
        return done({ message: checkPasswordResponse.message }, false);
      }
      const { user } = checkPasswordResponse;

      const accessTokenPayload = {
        id: user.getId(),
        expiresIn: new Date().setTime(new Date().getTime() + 200000),
      };

      const refreshTokenPayload = {
        email: user.email,
        expiresIn: new Date().setTime(new Date().getTime() + 1000000),
      };

      const accessToken = jwt.encode(
        accessTokenPayload,
        "secret"
      );
      const refreshToken = jwt.encode(
        refreshTokenPayload,
        "secret"
      );

      const data = user.getInfo(true);
      data.tokens = { accessToken, refreshToken };

      return done(null, data);
    })
    .catch((err) => done({ message: err.message }, false));
});
