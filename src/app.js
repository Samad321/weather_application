const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./util/geocode");
const forecast = require("./util/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const partialPath = path.join(__dirname, "../templetes/views");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "samad",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "samad",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "samad",
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
      return res.send({
          error: 'You must provide an address!'
      })
  }

  geocode(req.query.address, (error, { latitude, longitude, place }) => {
      if (error) {
          return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
              return res.send({ error })
          }

          res.send({
              forecast: forecastData,
              location:place,
              address: req.query.address
          })
      })
  })
})


app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "pleas make sure to provide the search ",
    });

    return console.log(
      "this kindda error had haepend :pleas make sure to provide the search "
    );
  }
  res.send({
    prodcut: "Product",
  });
});

app.get("*", (req, res) => {
  res.send("404 error masasge");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
