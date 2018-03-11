const axios = require('axios');
const cheerio = require('cheerio');

async function getYouTubeResults(query, page) {
    return new Promise(async (resolve, reject) =>{
        query = encodeURIComponent(query);
        let url = "https://www.youtube.com/results?q=" + query;
        if(page)
            url += "&page=" + page;
        try{
            var response = await axios.get(url);
            if (response.status !== 200)
                reject("YouTube Response code " + response.status);
        } catch(e){
            reject("YouTube Connection Error " + e);
        }
        let $ = cheerio.load(response.data);

        let title, length;
        let json = { results: [] };

        $(".yt-lockup-dismissable").each(function(index, vid) {
            // Get video details
            let title = $(vid).children().last().children().first().children().first().text();
            let url = "https://www.youtube.com" + $(vid).children().last().children().first().children().first().attr("href");
            let duration = /\d+:\d+/.exec($(vid).children().last().children().first().children().last().text());
            duration = (duration) ? duration[0] : "Playlist";
            let snippet = $(vid).children().last().children().eq(3).text();
            let upload_date = $(vid).children().last().children().eq(2).children().first().children().first().text();
            let views = $(vid).children().last().children().eq(2).children().first().children().last().text().split(" ")[0];
            let thumbnail = "http:" + $(vid).children().first().children().first().children().first().children().first().children().first().attr("src");
            let video = {
                "title": title,
                "url": url,
                "duration": duration,
                "snippet": snippet,
                "upload_date": upload_date,
                "thumbnail_src": thumbnail,
                "views": views
            }
            // Get user details
            let username = $(vid).children().last().children().eq(1).children().first().text();
            let user_url = "https://www.youtube.com" + $(vid).children().last().children().eq(1).children().first().attr("href");
            let verified = $(vid).children().last().children().eq(1).children().last().text() ? false : true;
            let uploader = {
                "username": username,
                "url": user_url,
                "verified": verified
            }
            // Send results
            json.results.push({ video: video, uploader: uploader });
        });
        resolve(json)
    })
}

module.exports.getYouTubeResults = getYouTubeResults;
