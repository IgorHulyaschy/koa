const db = require("./db/db");
const validator = require("./validator");

async function signIn(ctx) {
  await ctx.render("index", {
    title: "Sign in",
  });
}

async function profile(ctx) {
  await ctx.render("profile", {
    title: "Profile",
    profile: "activePage",
    location: "Profile",
  });
}
async function activeMessage(ctx) {
  await ctx.render("activate-message", {
    title: "Check E-mail",
  });
}
async function completeAcc(ctx) {
  await ctx.render("complete-acc", {
    title: "Complete account",
  });
}
async function passRecovery(ctx) {
  await ctx.render("pass-recovery", {
    title: "Reset password",
  });
}
async function profileMore(ctx) {
  await ctx.render("profileMore", {
    title: "Profile",
    profile: "activePage",
  });
}

async function resetMess(ctx) {
  await ctx.render("reset-message", {
    title: "Check E-mail",
  });
}

async function resetPass(ctx) {
  await ctx.render("reset-pass", {
    title: "Reset Password",
  });
}

async function search(ctx) {
  await ctx.render("search", {
    title: "Search",
    search: "activePage",
    location: "Search",
  });
}

async function signUp(ctx) {
  const { userId } = ctx.request.params;
  await validator.schema.validateAsync(body);
  const userResponse = await db.query(
    `SELECT * FROM "users_data" WHERE id = '${userId}'`
  );
  const user_data = { ...userResponse.rows[0] };
  await ctx.render("signUp", {
    title: "Sign up",
    name: user_data.fname,
    lastname: user_data.lname,
    login: user_data.login,
    email: user_data.email,
  });
}

async function createUser(ctx) {
  const { body } = ctx.request;
  await validator.schema.validateAsync(body);
  const createUserResponse = await db.query(
    `INSERT INTO "users_data" (fname, lname, login, email) VALUES 
    ('${body.fname}', '${body.lname}', '${body.login}', '${body.email}') RETURNING *`
  );

  const user = { ...createUserResponse.rows[0] };
  // await ctx.redis.set(user.id, JSON.stringify(user));
  // const result = await ctx.redis.get(JSON.parse(user.id)); 
  // console.log(result)
  ctx.status = 201;
  ctx.body = {
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    login: user.login,
    email: user.email,
  };
}

async function deleteUser(ctx) {
  const { body } = ctx.request;
  const { userId } = ctx.request.params;
  await validator.schema.validateAsync(body);
  const createUserResponse = await db.query(
    `DELETE FROM users_data WHERE id = ${userId} RETURNING *`
  );

  const user_data = { ...createUserResponse.rows[0] };

  ctx.status = 418;
  ctx.body = {
    message: "DELETED",
    fname: user_data.fname,
  };
}

async function updateUser(ctx) {
  const { id, fname } = ctx.request.body;
  await validator.schema.validateAsync(body);
  const createUserResponse = await db.query(
    `UPDATE users_data SET fname = '${fname}' WHERE id = '${id}' RETURNING *`
  );

  const user_data = { ...createUserResponse.rows[0] };

  ctx.status = 202;
  ctx.body = {
    id: user_data.id,
    fname: user_data.fname,
  };
}

async function getUser(ctx) {
  const { userId } = ctx.request.params;
  await validator.schema.validateAsync(body);
  const getUserResponse = await db.query(
    `SELECT * FROM "users_data" WHERE id = '${userId}'`
  );

  const user_data = { ...getUserResponse.rows[0] };

  ctx.status = 302;
  ctx.body = {
    id: user_data.id,
    fname: user_data.fname,
    lname: user_data.lname,
    login: user_data.login,
    email: user_data.email,
  };
}

async function list(ctx) {
  await ctx.render("list", {
    title: "List",
  });
}
async function adminZone(ctx) {
  await ctx.render("adminZone", {
    title: "Admin Zone",
  });
}

module.exports = {
  signIn,
  profile,
  activeMessage,
  completeAcc,
  passRecovery,
  profileMore,
  resetMess,
  resetPass,
  search,
  signUp,
  list,
  createUser,
  adminZone,
  deleteUser,
  updateUser,
  getUser,
};
