const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

//Home page
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//API route
app.get('/api/search', function(req, res){
    // Specify YouTube search url
    let url = `https://www.youtube.com/results?q=${req.query.q}${req.query.page ? `&page=${req.query.page}` : ''}`;

    // Access YouTube search
    request(url, function(error, response, html) {
        // Check for errors
        if (!error) {
            const $ = cheerio.load(html);
                        
            let json = { results: [] };

            $(".yt-lockup-dismissable").each(function(index, vid) {
                // Get video details
                let $metainfo = $(vid).find(".yt-lockup-meta-info li");
                let $thumbnail = $(vid).find(".yt-thumb img");
                let video = {
                    "title": $(vid).find(".yt-lockup-title").children().first().text(),
                    "url": `https://www.youtube.com${$(vid).find(".yt-lockup-title").children().first().attr("href")}`,
                    "duration": $(vid).find(".video-time").text().trim() || "Playlist",
                    "snippet": $(vid).find(".yt-lockup-description").text(),
                    "upload_date": $metainfo.first().text(),
                    "thumbnail_src": $thumbnail.data("thumb") || $thumbnail.attr("src"),
                    "views": $metainfo.first().text()
                }

                // Get user details
                let $byline = $(vid).find(".yt-lockup-byline");
                let uploader = {
                    "username": $byline.text(),
                    "url": `https://www.youtube.com${$byline.find("a").attr("href")}`,
                    "verified": !!$byline.find("[title=Verified]").length
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
