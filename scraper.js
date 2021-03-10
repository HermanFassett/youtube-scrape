const request = require('request');
const URL = require('url');

async function getFilters(query) {
    return new Promise((resolve, reject) => {
        let url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}&hl=en`;
        request(url, (error, response, html) => {
            if (!error && response.statusCode === 200) {
                // Get script json data from html to parse
                try {
                    let match = html.match(/ytInitialData[^{]*(.*"adSafetyReason":[^;]*});/s);
                    if (!match) {
                        match = html.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
                    }
                    let json = JSON.parse(match[1]);

                    // The following adapted from:
                    // https://github.com/TimeForANinja/node-ytsr/blob/wip-api-adjustments/lib/utils.js
                    const BASE_URL = 'https://www.youtube.com/';
                    const wrapper = json.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;
                    const filterWrapper = wrapper.subMenu.searchSubMenuRenderer.groups;
                    const parsedGroups = new Map();
                    for (const filterGroup of filterWrapper) {
                        // TODO: switch to Map when done caring about compatibility
                        const singleFilterGroup = [];
                        singleFilterGroup.active = null;
                        for (const filter of filterGroup.searchFilterGroupRenderer.filters) {
                        const isSet = !filter.searchFilterRenderer.navigationEndpoint;
                        let targetURL = null;
                        if (!isSet) targetURL = filter.searchFilterRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url;
                        const parsedFilter = {
                            description: filter.searchFilterRenderer.tooltip,
                            label: parseText(filter.searchFilterRenderer.label),
                            query: isSet ? null : URL.resolve(BASE_URL, targetURL),
                            isSet: isSet,
                            // TODO: remove when done caring about compatibility
                            active: isSet,
                            name: parseText(filter.searchFilterRenderer.label),
                            ref: isSet ? null : URL.resolve(BASE_URL, targetURL),
                        };
                        if (isSet) singleFilterGroup.active = parsedFilter;
                        singleFilterGroup.push(parsedFilter);
                        }
                        parsedGroups.set(parseText(filterGroup.searchFilterGroupRenderer.title), singleFilterGroup);
                    }
                    resolve(parsedGroups);
                }
                catch(ex) {
                    console.error("Failed to parse data:", ex);
                }
            }
        });
    })
}
function parseText(txt) {
    return txt.simpleText || txt.runs.map(a => a.text).join('');
} 

async function youtube(params, key, pageToken) {
    let query, type, hl, gl;
    if (typeof params === 'string') {
        query = params;
    }
    else {
        query = params.query;
        type = params.type;
        hl = params.hl;
        gl = params.gl;
    }
    let filterUrl = null;
    if (type && !key && !pageToken) {
        let filters = await getFilters(query);
        let typeFilter = filters.get('Type').find( filter => filter.name.toLowerCase() === type.toLowerCase() );
        if (typeFilter && typeFilter.query) {
            filterUrl = typeFilter.query;
        }
    }
    return new Promise((resolve, reject) => {
        let json = { results: [], version: require('./package.json').version };

        // Specify YouTube search url
        if (key) {
            json["parser"] = "json_format.page_token";
            json["key"] = key;
            
            // Access YouTube search API
            let clientParams = {
                clientName: "WEB",
                clientVersion: "2.20201022.01.01",
            };
            if (hl) clientParams.hl = hl;
            if (gl) clientParams.gl = gl;
            request.post(`https://www.youtube.com/youtubei/v1/search?key=${key}`, {
                json: {
                    context: {
                        client: clientParams,
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
            let url = filterUrl ? filterUrl : `https://www.youtube.com/results?q=${encodeURIComponent(query)}`;
            if (hl) {
                url += `&hl=${encodeURIComponent(hl)}`;
            }
            if (gl) {
                url += `&gl=${encodeURIComponent(gl)}`;
            }

            // Access YouTube search
            request(url, (error, response, html) => {
                // Check for errors
                if (!error && response.statusCode === 200) {
                    json["parser"] = "json_format";
                    json["key"] = html.match(/"innertubeApiKey":"([^"]*)/)[1];

                    // Get script json data from html to parse
                    let data, sectionLists = [];
                    try {
                        let match = html.match(/ytInitialData[^{]*(.*?);\s*<\/script>/s);
                        if (match && match.length > 1) {
                            json["parser"] += ".object_var";
                        }
                        else {
                            json["parser"] += ".original";
                            match = html.match(/ytInitialData"[^{]*(.*);\s*window\["ytInitialPlayerResponse"\]/s);
                        }
                        data = JSON.parse(match[1]);
                        json["estimatedResults"] = data.estimatedResults || "0";
                        sectionLists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
                    }
                    catch(ex) {
                        console.error("Failed to parse data:", ex);
                        console.log(data);
                    }

                    // Loop through all objects and parse data according to type
                    parseJsonFormat(sectionLists, json);
        
                    return resolve(json);
                }
                resolve({ error: error });
            });
        }
    });
};

/**
 * Parse youtube search results from json sectionList array and add to json result object
 * @param {Array} contents - The array of sectionLists
 * @param {Object} json - The object being returned to caller
 */
function parseJsonFormat(contents, json) {
    contents.forEach(sectionList => {
        try {
            if (sectionList.hasOwnProperty("itemSectionRenderer")) {
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
            else if (sectionList.hasOwnProperty("continuationItemRenderer")) {
                json["nextPageToken"] = sectionList.continuationItemRenderer.continuationEndpoint.continuationCommand.token;
            }
        }
        catch (ex) {
            console.error("Failed to read contents for section list:", ex);
            console.log(sectionList);
        }
    });
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