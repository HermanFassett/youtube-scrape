var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

//Home page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})
//API route
app.get('/api/search', function(req, res){
    // Specify YouTube search url
    var url = "https://www.youtube.com/results?q=" + req.query.q;
    if (req.query.page)
        url += "&page=" + req.query.page;
    // Access YouTube search
    request(url, function(error, response, html) {
        // Check for errors
        if(!error) {
            var $ = cheerio.load(html);
            
            var title, length;
            var json = { results: [] };

            $(".yt-lockup-dismissable").each(function(index, vid) {
                // Get video details
                var title = $(vid).children().last().children().first().children().first().text();
                var url = "https://www.youtube.com" + $(vid).children().last().children().first().children().first().attr("href");
                var duration = /\d+:\d+/.exec($(vid).children().last().children().first().children().last().text());
                duration = (duration) ? duration[0] : "Playlist";
                var snippet = $(vid).children().last().children().eq(3).text();
                var upload_date = $(vid).children().last().children().eq(2).children().first().children().first().text();
                var views = $(vid).children().last().children().eq(2).children().first().children().last().text().split(" ")[0];
                var thumbnail = "http:" + $(vid).children().first().children().first().children().first().children().first().children().first().attr("src");
                var video = {
                    "title": title,
                    "url": url,
                    "duration": duration,
                    "snippet": snippet,
                    "upload_date": upload_date,
                    "thumbnail_src": thumbnail,
                    "views": views
                }
                // Get user details
                var username = $(vid).children().last().children().eq(1).children().first().text();
                var user_url = "https://www.youtube.com" + $(vid).children().last().children().eq(1).children().first().attr("href");
                var verified = $(vid).children().last().children().eq(1).children().last().text() ? false : true;
                var uploader = {
                    "username": username,
                    "url": user_url,
                    "verified": verified
                }
                // Send results
                json.results.push({ video: video, uploader: uploader });
            });
            res.json(json);
        }
    });
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;