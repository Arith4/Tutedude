const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/api");
const articleSchema = {
  name: String,
  title: String,
};

const Article = mongoose.model("items", articleSchema);

app.get("/articles", (req, res) => {
  Article.find((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send(found);
    }
  });
});

app.post("/articles", (req, res) => {
  const element1 = new Article({
    name: req.body.name,
    title: req.body.title,
  });
  element1.save();
});

app.delete("/articles", (req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("Deleted");
    } else {
      res.send(err);
    }
  });
});

app.get("/articles/:articleName", (req, res) => {
  Article.findOne({ name: req.params.articleName }, (err, articleFound) => {
    if (err) {
      console.log(err);
    } else {
      res.send(articleFound);
    }
  });
});

app.put("/articles/:articleName", (req, res) => {
  Article.updateMany(
    { name: req.params.articleName },
    { name: req.body.name, title: req.body.title },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("updated");
      }
    }
  );
});

app.patch("/articles/:articleName", (req, res) => {
  Article.updateOne(
    { name: req.params.articleName },
    { $set: { title: req.body.title } },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("updated");
      }
    }
  );
});

app.delete("/articles/:articleName", (req, res) => {
  Article.deleteOne({ name: req.params.name }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
