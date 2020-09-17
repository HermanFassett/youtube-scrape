const cheerio = require('cheerio');
const request = require('request');

async function youtube(query, page) {
    return new Promise((resolve, reject) => {
        // Specify YouTube search url
        let url = `https://www.youtube.com/results?q=${encodeURIComponent(query)}${page ? `&page=${page}` : ''}`;

        // Access YouTube search
        request(url, (error, response, html) => {
            // Check for errors
            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);
                let json = { results: [], version: require('./package.json').version };

                // First attempt to parse old youtube search result style
                $(".yt-lockup-dismissable").each((index, vid) => {
                    json["parser"] = "html_format";
                    json.results.push(parseOldFormat($, vid));
                });

                // If that fails, we have to parse new format from json data in html script tag
                if (!json.results.length) {
                    json["parser"] = "json_format";

                    // Get script json data from html to parse
                    let data, sectionLists = [];
                    try {
                        data = html.substring(html.indexOf("ytInitialData") + 17);
                        data = JSON.parse(data.substring(0, data.indexOf('window["ytInitialPlayerResponse"]') - 6));
                        json["estimatedResults"] = data.estimatedResults || "0";
                        sectionLists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
                    }
                    catch(ex) {
                        console.error("Failed to parse data:", ex);
                        console.log(data);
                    }

                    // Loop through all objects and parse data according to type
                    sectionLists.filter(x => x.hasOwnProperty("itemSectionRenderer")).forEach(sectionList => {
                        try {
                            sectionList.itemSectionRenderer.contents.forEach(content => {
                                try {
                                    if (content.hasOwnProperty("channelRenderer")) {
                                        json.results.push(parseChannelRenderer(content.channelRenderer));
                                    }
                                    if (content.hasOwnProperty("videoRenderer")) {
                                        json.results.push(parseVideoRenderer(content.videoRenderer));
                                    }
                                    if (content.hasOwnProperty("radioRenderer")) {
                                        json.results.push(parseRadioRenderer(content.radioRenderer));
                                    }
                                    if (content.hasOwnProperty("playlistRenderer")) {
                                        json.results.push(parsePlaylistRenderer(content.playlistRenderer));
                                    }
                                }
                                catch(ex) {
                                    console.error("Failed to parse renderer:", ex);
                                    console.log(content);
                                }
                            });
                        }
                        catch (ex) {
                            console.error("Failed to read contents for section list:", ex);
                            console.log(sectionList);
                        }
                    });
                }
    
                return resolve(json);
            }
            resolve({ error: error });
        });
    });
}

/**
 * Parse youtube search results from dom elements
 * @param {CheerioStatic} $ - The youtube search results loaded with cheerio
 * @param {CheerioElement} vid - The current video being parsed
 * @returns object with data to return for this video
 */
function parseOldFormat($, vid) {
    // Get video details
    let $metainfo = $(vid).find(".yt-lockup-meta-info li");
    let $thumbnail = $(vid).find(".yt-thumb img");
    let video = {
        "id": $(vid).parent().data("context-item-id"),
        "title": $(vid).find(".yt-lockup-title").children().first().text(),
        "url": `https://www.youtube.com${$(vid).find(".yt-lockup-title").children().first().attr("href")}`,
        "duration": $(vid).find(".video-time").text().trim() || "Playlist",
        "snippet": $(vid).find(".yt-lockup-description").text(),
        "upload_date": $metainfo.first().text(),
        "thumbnail_src": $thumbnail.data("thumb") || $thumbnail.attr("src"),
        "views": $metainfo.last().text()
    };

    // Get user details
    let $byline = $(vid).find(".yt-lockup-byline");
    let uploader = {
        "username": $byline.text(),
        "url": `https://www.youtube.com${$byline.find("a").attr("href")}`,
        "verified": !!$byline.find("[title=Verified]").length
    };

    // Return json
    return { video: video, uploader: uploader };
}

/**
 * Parse a channelRenderer object from youtube search results
 * @param {object} renderer - The channel renderer
 * @returns object with data to return for this channel
 */
function parseChannelRenderer(renderer) {
    let channel = {
        "id": renderer.channelId,
        "title": renderer.title.simpleText,
        "url": `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        "snippet": renderer.descriptionSnippet ? renderer.descriptionSnippet.runs.reduce(comb, "") : "",
        "thumbnail_src": renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].url,
        "video_count": renderer.videoCountText ? renderer.videoCountText.runs.reduce(comb, "") : "",
        "subscriber_count": renderer.subscriberCountText ? renderer.subscriberCountText.simpleText : "0 subscribers",
        "verified": renderer.ownerBadges &&
                    renderer.ownerBadges.some(badge => badge.metadataBadgeRenderer.style.indexOf("VERIFIED") > -1) || 
                    false
    };

    return { channel };
}

/**
 * Parse a playlistRenderer object from youtube search results
 * @param {object} renderer - The playlist renderer
 * @returns object with data to return for this playlist
 */
function parsePlaylistRenderer(renderer) {
    let thumbnails = renderer.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails;
    let playlist = {
        "id": renderer.playlistId,
        "title": renderer.title.simpleText,
        "url": `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        "thumbnail_src": thumbnails[thumbnails.length - 1].url,
        "video_count": renderer.videoCount
    };

    let uploader = {
        "username": renderer.shortBylineText.runs[0].text,
        "url": `https://www.youtube.com${renderer.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`
    };

    return { playlist: playlist, uploader: uploader };
}

/**
 * Parse a radioRenderer object from youtube search results
 * @param {object} renderer - The radio renderer
 * @returns object with data to return for this mix
 */
function parseRadioRenderer(renderer) {
    let radio = {
        "id": renderer.playlistId,
        "title": renderer.title.simpleText,
        "url": `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        "thumbnail_src": renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].url,
        "video_count": renderer.videoCountText.runs.reduce(comb, "")
    };

    let uploader = {
        "username": renderer.shortBylineText ? renderer.shortBylineText.simpleText : "YouTube"
    };

    return { radio: radio, uploader: uploader };
}

/**
 * Parse a videoRenderer object from youtube search results
 * @param {object} renderer - The video renderer
 * @returns object with data to return for this video
 */
function parseVideoRenderer(renderer) {
    let video = {
        "id": renderer.videoId,
        "title": renderer.title.runs.reduce(comb, ""),
        "url": `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        "duration": renderer.lengthText ? renderer.lengthText.simpleText : "Live",
        "snippet": renderer.descriptionSnippet ?
                   renderer.descriptionSnippet.runs.reduce((a, b) => a + (b.bold ? `<b>${b.text}</b>` : b.text), ""):
                   "",
        "upload_date": renderer.publishedTimeText ? renderer.publishedTimeText.simpleText : "Live",
        "thumbnail_src": renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].url,
        "views": renderer.viewCountText ?
            renderer.viewCountText.simpleText || renderer.viewCountText.runs.reduce(comb, "") :
            (renderer.publishedTimeText ? "0 views" : "0 watching")
    };

    let uploader = {
        "username": renderer.ownerText.runs[0].text,
        "url": `https://www.youtube.com${renderer.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`
    };
    uploader.verified = renderer.ownerBadges &&
        renderer.ownerBadges.some(badge => badge.metadataBadgeRenderer.style.indexOf("VERIFIED") > -1) || 
        false;

    return { video: video, uploader: uploader };
}

/**
 * Combine array containing objects in format { text: "string" } to a single string
 * For use with reduce function
 * @param {string} a - Previous value
 * @param {object} b - Current object
 * @returns Previous value concatenated with new object text
 */
function comb(a, b) {
    return a + b.text;
}

module.exports.youtube = youtube;