var express = require("express");
var app = express();

const axios = require("axios").default;

app.use(express.static("public"));
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("Homepage");
});

require('dotenv').config()

const apiKey = process.env.omdbApiKey

app.post("/Details", function (req, res) {
  var title = req.body.title;
  var type = req.body.type;
  var showall = req.body.showall;

  axios.get("http://www.omdbapi.com/?s=" + title + "&type=" + type + "&apikey=" + apiKey)
    .then(function (response) {
      var result = showall == "on" ? response.data["Search"] : response.data["Search"].slice(0, 5);
      res.render("SearchResults", { data: result, movieName: title, type: type.charAt(0).toUpperCase() + type.slice(1) });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});



app.listen(3000, function () {
  console.log("Running server");
});