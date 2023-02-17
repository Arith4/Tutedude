const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let daytext = "";
  let currDay = new Date().getDay();
  if (currDay == 0 || currDay == 6) {
    daytext = "weekend";
  } else {
    daytext = "weekday";
  }
  res.render("list", { dayejs: daytext });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
