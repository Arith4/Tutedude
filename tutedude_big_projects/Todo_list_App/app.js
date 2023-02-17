const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [];
app.get("/", (req, res) => {
  res.render("list", { loopArr: items });
});

app.post("/", (req, res) => {
  var item = req.body.inputElement;
  items.push(item);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
