const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todo");
const taskSchema = new mongoose.Schema({
  name: String,
});
const taskModel = new mongoose.model("task", taskSchema);
const todo1 = new taskModel({
  name: "Learn DSA",
});

app.get("/", (req, res) => {
  taskModel.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", { loopArr: foundItems });
    }
  });
});

app.post("/", (req, res) => {
  const taskName = req.body.inputElement;
  const todo5 = new taskModel({
    name: taskName,
  });
  todo5.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checked = req.body.checkbox1;
  taskModel.findByIdAndRemove(checked, (err) => {
    if (!err) {
      console.log("Deleted");
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
