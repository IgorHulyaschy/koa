require("dotenv").config();
const jwt = require("jwt-simple");
const crypto = require("crypto");
const passport = require("koa-passport");

const { UserDB } = require("./models/UserDB");
const db = require("../db/db");
const { User } = require("./models/User");

class UsersController {
  static async createUser(ctx) {
    const { fname, lname, login, email, password } = ctx.request.body;
    ctx.status = 201;
    ctx.body = (
      await UserDB.createUser(fname, lname, login, email, password)
    ).getInfo();
  }

  static async logIn(ctx) {
    await passport.authenticate("local", (err, user) => {
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 400;
        if (err) {
          ctx.body = { error: err };
        }
      }
    })(ctx);
  }

  static profileAuth(ctx) {
    ctx.body = {
      success: true,
    };
  }

  static async updateCategory(ctx) {
    const { categoryid, email } = ctx.request.body;
    const category = 
    ctx.body = (
      await UserDB.updateCategory(categoryid, email)
    )
  }

  static async refresh(ctx) {
    const token = ctx.headers.authorization.split(" ")[1];
    const decodedToken = jwt.decode(token, "secret");

    if (decodedToken.expiresIn <= new Date().getTime()) {
      const error = new Error(
        "Refresh roken expired, please sign in into ur account"
      );
      error.status = 400;

      throw error;
    }
    const user = await UserDB.getUserByEmail(decodedToken.email);

    const accessToken = {
      id: user.id,
      expiresIn: new Date().setTime(new Date().getTime() + 200000),
    };

    const refreshToken = {
      email: user.email,
      expiresIn: new Date().setTime(new Date().getTime() + 1000000),
    };
    ctx.body = {
      accessToken: jwt.encode(accessToken, "secret"),
      accessTokenExpirationDate: accessToken.expiresIn,
      refreshToken: jwt.encode(refreshToken, "secret"),
      refreshTokenExpirationDate: refreshToken.expiresIn,
    };
  }

  static async userList(ctx) {
    const users = (await UserDB.userList()).map((user) => user.getInfo());

    ctx.body = {
      users,
    };
  }
}

module.exports = { UsersController };
