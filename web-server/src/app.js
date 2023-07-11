const express = require("express");
const path = require("path");
const app = express();

const staticPathName = path.join(__dirname, "../public");
console.log(staticPathName);

app.use(express.static(staticPathName));

app.get("/help", (req, res) => {
  res.send("Help Page!.");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page!.</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    name: "Weather Forecst",
    weather: "30 degrees",
  });
});

app.listen(3000, () => {
  console.log("Server UP Listening on Port : ", 3000);
});
