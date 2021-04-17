const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");

const views = require("koa-views");
const serve = require("koa-static");
const nunjucks = require("nunjucks");
const bodyParser = require("koa-bodyparser");

const passport = require("./src/libs/passport/koaPassport");
const globalRouter = require("./src/router");
const ErrorCatcher = require("./src/middlewares/errorCatcher");

passport.initialize();

const port = process.env.PORT || 3001;
const app = new Koa();

const router = new Router();

app.use(bodyParser());
app.use(ErrorCatcher);

const nunjucksEnvironment = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(path.join(__dirname, "/src/templates"))
);

const render = views(path.join(__dirname, "/src/templates/views"), {
  extention: "html",
  options: {
    nunjucksEnv: nunjucksEnvironment,
  },
  map: {
    html: "nunjucks",
  },
});

app.use(render);

app.use(serve(path.join(__dirname, "/src/public")));

router.use("/", globalRouter.router.routes());
router.use("/", require("./src/user/users_router"));
app.use(router.middleware());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
