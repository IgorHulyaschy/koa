const Router = require("koa-joi-router");
const passport = require("koa-passport");

const { UsersController } = require("./users_controller");
const Validator = require("./users_validator");

const requestRouter = new Router();

requestRouter.post("createUser", Validator.signUp, UsersController.createUser);
requestRouter.post("logIn", Validator.signIn, UsersController.logIn);
requestRouter.get(
  "profileAuth",
  passport.authenticate("jwt", { session: false }),
  UsersController.profileAuth
);
requestRouter.get("refresh", UsersController.refresh);
requestRouter.get(
  "list",
  passport.authenticate("jwt", { session: false }),
  UsersController.userList
);
requestRouter.post(
  "updateCategory",
  Validator.updateCategory,
  UsersController.updateCategory
);
module.exports = requestRouter;
