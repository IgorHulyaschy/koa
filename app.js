const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const views = require("koa-views");
const serve = require("koa-static");
const globalRouter = require("./src/router");
const nunjucks = require("nunjucks");
const bodyParser = require("koa-bodyparser");
const Redis = require("ioredis");

const port = process.env.PORT || 3001;
const app = new Koa();

const redis = new Redis("redis://eEz4GYw6eMe1QOp2f2Zb1LBvvHisjppB@redis-15584.c256.us-east-1-2.ec2.cloud.redislabs.com:15584");
app.context.redis = redis;

const router = new Router();

app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.isJoi) {
      ctx.throw(400, err.details[0].message);
    }
    console.log(err);
    ctx.throw(400, "Something wrong");
  }
});

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

app.use(router.routes());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
