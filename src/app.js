const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Manisrinivasa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Manisrinivasa",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Manisrinivasa",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "please provide address to find weather",
    });
  }

  geocode(req.params.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast({ lat, long }, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

// not found pages
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Manisrinivasa",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Manisrinivasa",
    errorMessage: "Page not Found",
  });
});

const server = app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

server.close();
