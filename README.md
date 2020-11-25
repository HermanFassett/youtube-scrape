# YouTube Scrape
A YouTube search scraping API

## Get search results
The base url to get search results, is as follows:<br>
```
http://youtube-scrape.herokuapp.com/api/search
```
The url query options are as follows:
<table>
  <thead>
    	<tr>
        <th>Query</th>
        <th>Type</th>
        <th>Description</th>
    	</tr>
  </thead>
  <tbody>
		<tr>
        <td>q</td>
        <td>String</td>
        <td>YouTube search query</td>
    	</tr>
    	<tr>
        <td>pageToken</td>
        <td>String</td>
        <td>(Optional) The token for page of YouTube search results. Returned by initial call</td>
    	</tr>
		<tr>
		<td>key</td>
		<td>String</td>
		<td>(Optional) Search key. Required if using pageToken. Returned by initial call</td>
		</tr>
  </tbody>
</table>

## Run with docker

To run this project with docker, go to project root directory and run following commands.

```
docker build -t <your username>/youtube-scrape .
docker run -p 8080:8080 -d <your username>/youtube-scrape
```

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


Here is an example call:
```
http://youtube-scrape.herokuapp.com/api/search?q=herman%20fassett
```
Example output:
```
{
	"results": [{
			"channel": {
				"id": "UCsOlslmdfxy6aG3O9Xkh5kA",
				"title": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"snippet": "I've always loved playing around with music, and here I just upload what I come up with when I find the time and inspiration.",
				"thumbnail_src": "//yt3.ggpht.com/ytc/AAUvwniWIAGffEoRyJT647qKbp9A0Vt5k1FPnGdRsXjG2w=s176-c-k-c0x00ffffff-no-rj-mo",
				"video_count": "18 videos",
				"subscriber_count": "39 subscribers",
				"verified": false
			}
		},
		{
			"video": {
				"id": "ZzATESobfOw",
				"title": "Falling Gold - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=ZzATESobfOw",
				"duration": "12:01",
				"snippet": "Some gentle piano music for autumn and November and you.",
				"upload_date": "2 weeks ago",
				"thumbnail_src": "https://i.ytimg.com/vi/ZzATESobfOw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCD8ZtpwSwl868wIAUb2pnGmIeTZA",
				"views": "163 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "xprYPd5QxhA",
				"title": "One Summer Night (Cover) - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=xprYPd5QxhA",
				"duration": "3:14",
				"snippet": "Here's a quick cover of One Summer Night which I think was originally sung by Chelsia Chan and Kenny Bee.",
				"upload_date": "9 months ago",
				"thumbnail_src": "https://i.ytimg.com/vi/xprYPd5QxhA/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBJqrvHt08cSVDE7iKr5S-dtx_coQ",
				"views": "414 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "8F8LUGcGceg",
				"title": "Whisper",
				"url": "https://www.youtube.com/watch?v=8F8LUGcGceg",
				"duration": "4:44",
				"snippet": "Somehow I chose the most sibilant and plosive words for the lyrics. For piano and voice, which melody I cannot sing. Here's my ...",
				"upload_date": "1 month ago",
				"thumbnail_src": "https://i.ytimg.com/vi/8F8LUGcGceg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDNWjudRN-TWAQkPnE5k5SdCdAjXA",
				"views": "194 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "UYDxk7ZKvS0",
				"title": "Power - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=UYDxk7ZKvS0",
				"duration": "5:09",
				"snippet": "This is a bit more of an experimental piece I've been putting time into here and there for many months. The instrumentation is a ...",
				"upload_date": "1 year ago",
				"thumbnail_src": "https://i.ytimg.com/vi/UYDxk7ZKvS0/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDEvkQ3GUu8eFJEmFe26CFBKIH0xA",
				"views": "112 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "nv7xf0MUFzw",
				"title": "The Path To Freedom - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=nv7xf0MUFzw",
				"duration": "3:31",
				"snippet": "I wanted to change a few things to this piece, but I've been really busy and haven't uploaded anything in awhile. So, here it is as it ...",
				"upload_date": "5 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/nv7xf0MUFzw/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC4l2eOwD0KYnB7N6WlqimFpxYz8w",
				"views": "186 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "WGYqoa0iePs",
				"title": "After Harvest - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=WGYqoa0iePs",
				"duration": "2:13",
				"snippet": "I actually wrote this piece nearly 3 months ago and it was the quickest composition I've ever made. However, I've been distracted ...",
				"upload_date": "4 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/WGYqoa0iePs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBiGMYXJ0rCWc6RADDdi7p8UTFvBA",
				"views": "62 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "xDeNtHCLN88",
				"title": "It's December Once Again - Herman Fassett (#RoomieMelody)",
				"url": "https://www.youtube.com/watch?v=xDeNtHCLN88",
				"duration": "3:51",
				"snippet": "This is my entry into the #RoomieMelody challenge. I decided there can never be too many Christmas songs... Challenge origin ...",
				"upload_date": "11 months ago",
				"thumbnail_src": "https://i.ytimg.com/vi/xDeNtHCLN88/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDpPFRUkrJSJSTTnw_rx6bBTkHaXQ",
				"views": "213 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "7EY2qJ9vQHI",
				"title": "Sunrise - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=7EY2qJ9vQHI",
				"duration": "2:36",
				"snippet": "This is a song I wrote during my Thanksgiving break. I hope to be writing more pieces now that Christmas break here (or close).",
				"upload_date": "5 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/7EY2qJ9vQHI/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDBNg5vXeK3x27lvwS96S9MAz_QiA",
				"views": "305 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"playlist": {
				"id": "PLCgnza08eA91orhHvNPTp_gEjECGyV9HT",
				"title": "Top Tracks - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=_7TFT9CCN4Q&list=PLCgnza08eA91orhHvNPTp_gEjECGyV9HT",
				"thumbnail_src": "https://i.ytimg.com/vi/_7TFT9CCN4Q/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC9UMsM9KtNlfdxo4Fc9ubv14KuhQ",
				"video_count": "16"
			},
			"uploader": {
				"username": "Herman Fassett - Topic",
				"url": "https://www.youtube.com/channel/UCDKLO7jQj_lq3_mq0ynlrAg"
			}
		},
		{
			"video": {
				"id": "fnpvgyuooPs",
				"title": "Exiled - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=fnpvgyuooPs",
				"duration": "2:01",
				"snippet": "My friends have been asking me what I really do all day... No, this isn't everything, but it's what I spent the majority of my Veteran's ...",
				"upload_date": "6 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/fnpvgyuooPs/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA36HnlcDWqhFKVHGS3PsWJk37A2g",
				"views": "143 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "nRWJdaymQdg",
				"title": "Blessed are Those Who Mourn - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=nRWJdaymQdg",
				"duration": "3:23",
				"snippet": "This is a re-mixed version of a piece I wrote for the Documentary \"Echoes from The Heart\" on Gerondissa Makrina by Fiery ...",
				"upload_date": "2 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/nRWJdaymQdg/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAozvZ6ZMlUkXqodXtErMXjoRrx9Q",
				"views": "127 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "d5JAd7N3mBY",
				"title": "Snowfall - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=d5JAd7N3mBY",
				"duration": "2:52",
				"snippet": "Merry Christmas! This is my winter Christmas music this year -- actually I composed this as a gift to one of my sisters. ;) The video ...",
				"upload_date": "4 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/d5JAd7N3mBY/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBBfHLHK5ExHxBhq_GkSmmF7SVgsQ",
				"views": "66 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "ykYTImq7p9A",
				"title": "Growth - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=ykYTImq7p9A",
				"duration": "3:28",
				"snippet": "A piece I've had in the works for a long time and have only just decided on a name. This is to signify the change around us as we ...",
				"upload_date": "4 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/ykYTImq7p9A/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB1PDcZ-Hm3BHuZsN5mtKmuQcnxug",
				"views": "69 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "Za7OZ6MsmjU",
				"title": "A Winter Day - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=Za7OZ6MsmjU",
				"duration": "3:24",
				"snippet": "Here's my Christmas / Winter / New Year piece. I created it a few days back, but made a few minor adjustments today. Image used: ...",
				"upload_date": "5 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/Za7OZ6MsmjU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLB93vKkHO25kwjat25pHr-Lmaj5Iw",
				"views": "115 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "nn7Ogr2x1ho",
				"title": "God Rest Ye Merry Gentlemen - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=nn7Ogr2x1ho",
				"duration": "4:21",
				"snippet": "A few hours of recording and mixing got me this. Nothing fancy, and so I was hoping to put some video story to it but yeah, didn't ...",
				"upload_date": "2 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/nn7Ogr2x1ho/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAnzqzy5g0pe2S9pOrjByqeCeoT5Q",
				"views": "58 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "p3REFOpIx6c",
				"title": "Darkness Comes (WOT Fan Music) - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=p3REFOpIx6c",
				"duration": "3:22",
				"snippet": "This piece is kind of playing around with a very different style than I have ever done before, and I have also been reading the ...",
				"upload_date": "4 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/p3REFOpIx6c/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBmT8xuh188F3IY8qGjxJRVWzRnAQ",
				"views": "86 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"video": {
				"id": "N2RhnMPbOPc",
				"title": "Our Barren Lands (Cello) - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=N2RhnMPbOPc",
				"duration": "3:05",
				"snippet": "I actually had this cello melody sort of lying around and thought I'd pull it out really quickly for this contest: ...",
				"upload_date": "4 years ago",
				"thumbnail_src": "https://i.ytimg.com/vi/N2RhnMPbOPc/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCRed2S-gR0bN55n86v8wpH5Scfsw",
				"views": "61 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		},
		{
			"channel": {
				"id": "UCDKLO7jQj_lq3_mq0ynlrAg",
				"title": "Herman Fassett - Topic",
				"url": "https://www.youtube.com/channel/UCDKLO7jQj_lq3_mq0ynlrAg",
				"snippet": "",
				"thumbnail_src": "//yt3.ggpht.com/4YbD3rhI-u663smC4uJ8_KI5S__KbzvYO_R8E_p6ZhO3Yim3LujhtBK797bea-ObO8DN0owI=s176-c-k-c0x00ffffff-no-rj-mo",
				"video_count": "16 videos",
				"subscriber_count": "0 subscribers",
				"verified": false
			}
		},
		{
			"video": {
				"id": "HAF11xeBOF0",
				"title": "Sussex Carol (On Christmas Night) - Herman Fassett",
				"url": "https://www.youtube.com/watch?v=HAF11xeBOF0",
				"duration": "1:39",
				"snippet": "Just a quick cover of a Christmas carol since we're so close (some of us)...",
				"upload_date": "1 year ago",
				"thumbnail_src": "https://i.ytimg.com/vi/HAF11xeBOF0/hqdefault.jpg?sqp=-oaymwEjCOADEI4CSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLA-iD7F5MPj1OnHhiU8-FPozXh_wA",
				"views": "34 views"
			},
			"uploader": {
				"username": "Herman Fassett",
				"url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
				"verified": false
			}
		}
	],
	"version": "0.1.3",
	"parser": "json_format.scraper_data",
	"key": "PXzaSyAO_HN5RlqU8Q4STEHLGCilw_Y9_11qcZ7",
	"estimatedResults": "428",
	"nextPageToken": "XvPREg5oZXJtYW4gPmFzc2V0dBrAA1NCU0NBUmhWSXCDUGJITnNiV1JtZUhrMllVY3pUemxZYTJnMWEwR0NBUXRhZWtGVVJWTnZZbVpQZDRJQkMzaHdjbGxRWkRWUmVHaEJnZ0VMT0VZNFRGVkhZMGRqWldlQ0FRdFZXVVI0YXpkYVMzWlRNSUlCQzI1Mk4zaG1NRTFWUm5wM2dnRUxWMGRaY1c5aE1HbGxVSE9DQVF0NFJHVk9kRWhEVEU0NE9JSUJDemRGV1RKeFNqbDJVVWhKZ2dFaVVFeERaMjU2WVRBNFpVRTVNVzl5YUVoMlRsQlVjRjluUldwRlEwZDVWamxJVklJQkMyWnVjSFpuZVhWdmIxQnpnZ0VMYmxKWFNtUmhlVzFSWkdlQ0FRdGtOVXBCWkRkT00yMUNXWUlCQzNscldWUkpiWEUzY0RsQmdnRUxXbUUzVDFvMlRYTnRhbFdDQVF0dWJqZFBaM0l5ZURGb2I0SUJDM0F6VWtWR1QzQkplRFpqZ2dFTFRqSlNhRzVOVUdKUFVHT0NBUmhWUTBSTFRFODNhbEZxWDJ4eE0xOXRjVEI1Ym14eVFXZUNBUXRJUVVZeE1YaGxRazlHTUElM0QlM0TKARsaF2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tIgAYgeDoGCILc2VhcmNoLWZlZWQ%3D"
}
```