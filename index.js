const express = require("express");
const connectMongoDb = require("./connect");
const app = express();
const PORT = 5000;
const urlRoute = require("./routes/url");
const getAnalysis = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
// Connection
connectMongoDb("mongodb://127.0.0.1:27017/urlDb").then(() => {
  console.log("Database connected");
});

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.get("/analytics/:shortId", getAnalysis);

app.listen(PORT, () => console.log(`Server started at part : ${PORT}`));
