// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
var mongoose = require("mongoose");

// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

mongoose.connect("mongodb://localhost/techScrap", { useNewUrlParser: true });

// A GET route for scraping the echoJS website
app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.businessinsider.com/sai").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        $("h2 a").each(function (i, element) {
            // Save an empty result object
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
          result.link = $(this)
            .children("a")
            .attr("href");

        });
    });
});