const Router = require("koa-router");
const controllers = require("./controller");
const router = new Router();

router.get("signIn", controllers.signIn);
router.get("profile", controllers.profile);
router.get("activate-message", controllers.activeMessage);
router.get("complete", controllers.completeAcc);
router.get("password-recovery", controllers.passRecovery);
router.get("profile-info", controllers.profileMore);
router.get("reset-password", controllers.resetPass);
router.get("search", controllers.search);

router.get("reset-message", controllers.resetMess);
router.get("", controllers.list);
router.get("signUp", controllers.signUp);
router.get("admin-zone", controllers.adminZone);
//CRUD
router.get("signUp/:userId", controllers.signUp);
// router.post("user", controllers.createUser);
// router.delete("delete/:userId", controllers.deleteUser);
// router.post("update", controllers.updateUser)
// router.get("get/:userId", controllers.getUser)
module.exports = {
  router,
};
