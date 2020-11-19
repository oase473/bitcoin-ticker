//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  if (req.body.email) {
    console.log(req.body.email);
  } else {
    console.log("empty email");
  }
  res.redirect("/");
});

app.get("/indices/global/ticker/BTCUSD", function(req, res) {
  request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body) {
    console.log(body);
    var jsonData = JSON.parse(body);
    var obj = jsonData.averages.day;
    console.log(JSON.stringify(jsonData.display_timestamp) + " " + JSON.stringify(jsonData.display_symbol) + " " + JSON.stringify(obj));
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running...");
});