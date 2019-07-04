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
    axios.get("https://www.nytimes.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        var article = [];

        $(".assetWrapper").each(function (i, element) {
            // Save an empty result object
            var result = {};

            result.headline = $(this)
                .find("h2")
                .text();
            result.summary = $(this)
                .find("p")
                .text();
            result.link = $(this)
                .find("a")
                .attr("href");
            console.log(result);

            article.push(result);


        });
        //connect to database
        db.Article.create(article).then(function (data) {
            console.log(data);

        })
    });
});

app.listen(PORT, function () {
    console.log(PORT);
})