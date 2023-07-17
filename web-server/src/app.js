const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

//Paths
const staticPathName = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//hbs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPathName));

app.get("", (req, res) => {
  res.render("index", {
    title: "Index HBS FILE - Web SERVER",
    name: "Raghav Goel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About HBS FILE - Web SERVER",
  });
});
app.get("/help", (req, res) => {
  res.send("Help Page!.");
});

app.get("/about", (req, res) => {
  res.send("<h1>About Page!.</h1>");
});

app.get("/weather", (req, res) => {
  let query = req.query;
  if (!query.address) {
    return res.send({
      error: "Please Provide the Address",
    });
  }

  res.send({
    name: "Weather Forecst",
    weather: "30 degrees",
    address: query.address,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMesage: "Not a Valid Route, Please enter a valid Route",
    name: "Raghav Goel",
  });
});

app.listen(3000, () => {
  console.log("Server UP Listening on Port : ", 3000);
});
