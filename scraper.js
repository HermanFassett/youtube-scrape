const request = require('request');

/**
 * Get videos in a playlist
 * @param {string} id - The playlist id 
 */
async function playlist(id) {
    return new Promise((resolve, reject) => {
        let json = { results: [], playlistId: id, version: require('./package.json').version };

        let url = `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}`;

        // Access YouTube playlist page
        request(url, (error, response, html) => {
            // Check for errors
            if (!error && response.statusCode === 200) {
                json["parser"] = "json_format";
                json["key"] = html.match(/"innertubeApiKey":"([^"]*)/)[1];

                // Get script json data from html to parse
                let data, sectionLists = [];
                try {
                    let match = html.match(/ytInitialData[^{]*(.*"sidebar":[^;]*});/s);
                    if (match && match.length > 1) {
                        json["parser"] += ".object_var";
                    }
                    else {
                        json["parser"] += ".original";
                        match = html.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
                    }
                    data = JSON.parse(match[1]);
                    json["estimatedResults"] = data.estimatedResults || "0";
                    sectionLists = data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer;
                }
                catch(ex) {
                    console.error("Failed to parse data:", ex);
                    console.log(data);
                }

                // Loop through all objects and parse data according to type
                parseList(sectionLists, json);

                return resolve(json);
            }
            resolve({ error: error });
        });
    });
};

/**
 * Search YouTube
 * @param {string} query - The search query
 * @param {string} key - The api key
 * @param {string} pageToken - The page token
 */
async function youtube(query, key, pageToken) {
    return new Promise((resolve, reject) => {
        let json = { results: [], version: require('./package.json').version };

        // Specify YouTube search url
        if (key) {
            json["parser"] = "json_format.page_token";
            json["key"] = key;
            
            // Access YouTube search API
            request.post(`https://www.youtube.com/youtubei/v1/search?key=${key}`, {
                json: {
                    context: {
                        client: {
                            clientName: "WEB",
                            clientVersion: "2.20201022.01.01",
                        },
                    },
                    continuation: pageToken
                },
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    parseJsonFormat(body.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems, json);
                    return resolve(json);
                }
                resolve({ error: error });
            });
        }
        else {
            let url = `https://www.youtube.com/results?q=${encodeURIComponent(query)}`;

            // Access YouTube search
            request(url, (error, response, html) => {
                // Check for errors
                if (!error && response.statusCode === 200) {
                    json["parser"] = "json_format";
                    json["key"] = html.match(/"innertubeApiKey":"([^"]*)/)[1];

                    // Get script json data from html to parse
                    let data, sectionLists = [];
                    try {
                        let match = html.match(/ytInitialData[^{]*(.*"adSafetyReason":[^;]*});/s);
                        if (match && match.length > 1) {
                            json["parser"] += ".object_var";
                        }
                        else {
                            json["parser"] += ".original";
                            match = html.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
                        }
                        data = JSON.parse(match[1]);
                        json["estimatedResults"] = data.estimatedResults || "0";
                        sectionLists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;
                    }
                    catch(ex) {
                        console.error("Failed to parse data:", ex);
                        console.log(data);
                    }

                    // Loop through all objects and parse data according to type
                    parseList(sectionLists, json);
        
                    return resolve(json);
                }
                resolve({ error: error });
            });
        }
    });
};

/**
 * Parse youtube search results from list with contents and add to json result object
 * @param {Array} contents - The array of sectionLists
 * @param {Object} json - The object being returned to caller
 */
function parseList(list, json) {
    if (list.hasOwnProperty("contents")) {
        list.contents.forEach(item => {
            try {
                if (item.hasOwnProperty("itemSectionRenderer")) {
                    parseList(item.itemSectionRenderer, json);
                }
                if (item.hasOwnProperty("playlistVideoListRenderer")) {
                    parseList(item.playlistVideoListRenderer, json);
                }
                if (item.hasOwnProperty("channelRenderer")) {
                    json.results.push(parseChannelRenderer(item.channelRenderer));
                }
                if (item.hasOwnProperty("videoRenderer")) {
                    json.results.push(parseVideoRenderer(item.videoRenderer));
                }
                if (item.hasOwnProperty("playlistVideoRenderer")) {
                    json.results.push(parsePlaylistVideoRenderer(item.playlistVideoRenderer));
                }
                if (item.hasOwnProperty("radioRenderer")) {
                    json.results.push(parseRadioRenderer(item.radioRenderer));
                }
                if (item.hasOwnProperty("playlistRenderer")) {
                    json.results.push(parsePlaylistRenderer(item.playlistRenderer));
                }
                if (item.hasOwnProperty("continuationItemRenderer")) {
                    json["nextPageToken"] = item.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                }
            }
            catch (ex) {
                console.error("Failed to parse renderer:", ex);
                console.log(item);
            }
        });
    }
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
 * Parse a playlistVideoRenderer object from youtube search results
 * @param {object} renderer - The playlist video renderer
 * @returns object with data to return for this video
 */
function parsePlaylistVideoRenderer(renderer) {
    let video = {
        "id": renderer.videoId,
        "title": renderer.title.runs.reduce(comb, ""),
        "url": `https://www.youtube.com${renderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        "duration": renderer.lengthText ? renderer.lengthText.simpleText : "Live",
        "thumbnail_src": renderer.thumbnail.thumbnails[renderer.thumbnail.thumbnails.length - 1].url,
    };

    let uploader = {
        "username": renderer.shortBylineText.runs[0].text,
        "url": `https://www.youtube.com${renderer.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`
    };

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
module.exports.playlist = playlist;