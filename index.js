const express = require("express");
const connectMongoDb = require("./connect");
const app = express();
const PORT = 5000;
const getAnalysis = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/urlDb").then(() => {
  console.log("Database connected");
});

// MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true } // This option returns the updated document
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    // Handle the case when no document is found
    res.status(404).send("Short URL not found");
  }
});
app.get("/analytics/:shortId", getAnalysis);

app.listen(PORT, () => console.log(`Server started at part : ${PORT}`));
