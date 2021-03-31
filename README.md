# HOOD - from english slang language "район, местность"
## Watch the app: [Click here](https://koa-project-hood.herokuapp.com/)

### Routs for db requests:
```javascript
router.get("signUp/:userId", controllers.signUp);
router.post("user", controllers.createUser);
router.delete("delete/:userId", controllers.deleteUser);
router.post("update", controllers.updateUser)
router.get("get/:userId", controllers.getUser)
```
