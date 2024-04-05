const User = require("../models/user");
const { setUser } = require("../service/auth");
const { v4: uuidv4 } = require("uuid");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    res.redirect("/");
  } else {
    res.status(401).send("Invalid credentials");
  }
}
module.exports = { handleUserSignUp, handleUserLogin };
