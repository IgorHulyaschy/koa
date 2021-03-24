
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
  await ctx.render("signUp", {
    title: "Sign up",
  });
}
async function list(ctx) {
  await ctx.render("list", {
    title: "List",
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
};
