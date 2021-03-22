const Router = require("koa-router");
const controllers = require("./controller");
const router = new Router();

router.get("SignIn", controllers.signIn);
router.get("base", controllers.base);
router.get("baseOfProfile", controllers.baseOfProfile);
router.get("Profile", controllers.profile);
router.get("Activate-message", controllers.activeMessage);
router.get("Complete", controllers.completeAcc);
router.get("Password-recovery", controllers.passRecovery);
router.get("Profile-info", controllers.profileMore);
router.get("Reset-password", controllers.resetPass);
router.get("Search", controllers.search);
router.get("SignUp", controllers.signUp);
router.get("Reset-message", controllers.resetMess);
router.get("", controllers.list);
module.exports = {
  router,
};
