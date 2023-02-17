const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/secrets");

const trySchema = new mongoose.Schema({
  email: String,
  password: String,
});
const item = mongoose.model("second", trySchema);

const secret = "thisiskey";
trySchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/register", (req, res) => {
  const newUser = new item({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  item.findOne({ email: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
