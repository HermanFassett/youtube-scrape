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
        <td>page</td>
        <td>Number</td>
        <td>The page of YouTube search results</td>
    	</tr>
  </tbody>
</table>

Note that if no page is specified the default is 1
Here is an example call:
```
http://youtube-scrape.herokuapp.com/api/search?q=herman%20fassett&page=1
```
Example output:
```
{
  "results": [
    {
      "video": {
        "id": "UYDxk7ZKvS0",
        "title": "Power - Herman Fassett",
        "url": "https://www.youtube.com/watch?v=UYDxk7ZKvS0",
        "duration": "5:09",
        "snippet": "This is a bit more of an experimental piece I've been putting time into here and there for many months. The instrumentation is a ...",
        "upload_date": "3 months ago",
        "thumbnail_src": "https://i.ytimg.com/vi/UYDxk7ZKvS0/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCvD8gH689UXTRhFgbNwS0vINFBwQ",
        "views": "50 views"
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
        "upload_date": "4 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/7EY2qJ9vQHI/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLC3HIG8hXaf4OsT3An-LGTU6TqSSw",
        "views": "267 views"
      },
      "uploader": {
        "username": "Herman Fassett",
        "url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
        "verified": false
      }
    },
    {
      "video": {
        "id": "fnpvgyuooPs",
        "title": "Exiled - Herman Fassett",
        "url": "https://www.youtube.com/watch?v=fnpvgyuooPs",
        "duration": "2:01",
        "snippet": "My friends have been asking me what I really do all day... No, this isn't everything, but it's what I spent the majority of my Veteran's ...",
        "upload_date": "4 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/fnpvgyuooPs/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDfwb-sTXiWJRBW2r0AZpL_d-Z04A",
        "views": "138 views"
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
        "upload_date": "3 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/WGYqoa0iePs/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCy2EGDrtJ3sRE55qLJg-JPhXkBBg",
        "views": "54 views"
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
        "upload_date": "4 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/nv7xf0MUFzw/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCZMgoyaehC7Ipu73TUS7ThBa5_0w",
        "views": "160 views"
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
        "upload_date": "3 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/N2RhnMPbOPc/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAYG5PNzKH7URab-ca2louNTRgyIg",
        "views": "53 views"
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
        "upload_date": "1 year ago",
        "thumbnail_src": "https://i.ytimg.com/vi/nRWJdaymQdg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBBiI40-GH95GjStq33oqjJ5mkWOQ",
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
        "id": "ykYTImq7p9A",
        "title": "Growth - Herman Fassett",
        "url": "https://www.youtube.com/watch?v=ykYTImq7p9A",
        "duration": "3:28",
        "snippet": "A piece I've had in the works for a long time and have only just decided on a name. This is to signify the change around us as we ...",
        "upload_date": "3 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/ykYTImq7p9A/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDGCSwJUJOnN3eMLahUv6QSEKKETA",
        "views": "60 views"
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
        "upload_date": "4 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/Za7OZ6MsmjU/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDp-pHYmBcUIx2mAoEAelYxBnhcmQ",
        "views": "87 views"
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
        "upload_date": "1 year ago",
        "thumbnail_src": "https://i.ytimg.com/vi/nn7Ogr2x1ho/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBOGjXnr1LRyncp0XusbQYgvd2cIg",
        "views": "41 views"
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
        "upload_date": "3 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/d5JAd7N3mBY/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDEUtiwdowjp82OUTcWDKsf8CxsSA",
        "views": "54 views"
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
        "upload_date": "3 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/p3REFOpIx6c/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAOXYUTnD5xnmFo1O0kkHYM4fwWxw",
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
        "title": "Class is Rock",
        "url": "https://www.youtube.com/watch?v=I8OE5aBNbRE&list=PLMd5zi5Pk3a4MBOMvvTv4oPk8wQgA1_Dy",
        "duration": "Playlist",
        "snippet": "",
        "upload_date": "View full playlist",
        "thumbnail_src": "https://i.ytimg.com/vi/I8OE5aBNbRE/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBCjk3anx7Z7QDASbZFpXyrxCVaQA",
        "views": "View full playlist"
      },
      "uploader": {
        "username": "edward fassett",
        "url": "https://www.youtube.com/channel/UC4htQYfvrdrQQjcDDvintjA",
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
        "upload_date": "8 months ago",
        "thumbnail_src": "https://i.ytimg.com/vi/HAF11xeBOF0/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDEt5XxawIE8K1aMY_UA15xK8hRlQ",
        "views": "19 views"
      },
      "uploader": {
        "username": "Herman Fassett",
        "url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
        "verified": false
      }
    },
    {
      "video": {
        "id": "s81qJvX5qrI",
        "title": "Brightness Davar - (Stormlight Archive Music)",
        "url": "https://www.youtube.com/watch?v=s81qJvX5qrI",
        "duration": "7:02",
        "snippet": "Here's a new piece I've written which is a fan piece for Brandon Sanderson's Stormlight Archive books. This follows the events that ...",
        "upload_date": "4 years ago",
        "thumbnail_src": "https://i.ytimg.com/vi/s81qJvX5qrI/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBxrQEfJvdzCMJO7j-n3s0aB_MnkQ",
        "views": "2,891 views"
      },
      "uploader": {
        "username": "Herman Fassett",
        "url": "https://www.youtube.com/channel/UCsOlslmdfxy6aG3O9Xkh5kA",
        "verified": false
      }
    },
    {
      "video": {
        "id": "UrpEH4LEJcs",
        "title": "First Antiphon, apr. Michael van Opstall",
        "url": "https://www.youtube.com/watch?v=UrpEH4LEJcs",
        "duration": "2:46",
        "snippet": "First Antiphon, recorded in St. Nicholas ROC, Seattle. July 7, 2018. Video by Natalie Philo. Basses: Michael van Opstall, ...",
        "upload_date": "1 year ago",
        "thumbnail_src": "https://i.ytimg.com/vi/UrpEH4LEJcs/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDmWxKnwgC-uZJvH5M0kNRcT_DV9w",
        "views": "82 views"
      },
      "uploader": {
        "username": "Michael van Opstall",
        "url": "https://www.youtube.com/user/opstall",
        "verified": false
      }
    },
    {
      "video": {
        "id": "1NY9jFPLAY4",
        "title": "Приидите, поклонимся, прот. Михаила ван Опсталя",
        "url": "https://www.youtube.com/watch?v=1NY9jFPLAY4",
        "duration": "0:41",
        "snippet": "Come Let Us Worship, recorded in St. Nicholas ROC, Seattle. July 7, 2018. Video by Natalie Philo. Basses: Michael van Opstall, ...",
        "upload_date": "1 year ago",
        "thumbnail_src": "https://i.ytimg.com/vi/1NY9jFPLAY4/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLD4ChzCxLnWPBrOPfX8EBAE_FoyTQ",
        "views": "26 views"
      },
      "uploader": {
        "username": "Michael van Opstall",
        "url": "https://www.youtube.com/user/opstall",
        "verified": false
      }
    },
    {
      "video": {
        "title": "Classic Rock",
        "url": "https://www.youtube.com/watch?v=EmRG0Y5N8lg&list=PL1sw4SZS1FDfbKJbYeuOUU-eojRP2yBdM",
        "duration": "Playlist",
        "snippet": "",
        "upload_date": "View full playlist",
        "thumbnail_src": "https://i.ytimg.com/vi/EmRG0Y5N8lg/hqdefault.jpg?sqp=-oaymwEXCPYBEIoBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLClVUFx7fjhdILXpn1X4sBlJZUGqg",
        "views": "View full playlist"
      },
      "uploader": {
        "username": "Edward Fassett",
        "url": "https://www.youtube.com/channel/UCvO9VZDUDsPDKk8DA3-AmSw",
        "verified": false
      }
    }
  ]
}
```
