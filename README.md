#YouTube Scrape
A YouTube search scraping API
##Get search results
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

Here is an example call:
```
http://youtube-scrape.herokuapp.com/api/search?q=herman%20fassett&page=1
```
Example output:
```
{
    "blanks": 
    [
        "foreign country",
        "adverb",
        "adjective",
        "animal",
        "verb ending in 'ing'",
        "verb",
        "verb ending in 'ing'",
        "adverb",
        "adjective",
        "a place",
        "type of liquid",
        "part of the body",
        "verb"

    ],
    "value":
    [
        "If you are traveling in ",
        " and find yourself having to cross a piranha-filled river, here's how to do it ",
        ": \n* Piranhas are more ",
        " during the day, so cross the river at night.\n* Avoid areas with netted ",
        " traps--piranhas may be ",
        " there looking to ",
        " them!\n* When ",
        " the river, swim ",
        ". You don't want to wake them up and make them ",
        "!\n* Whatever you do, if you have an open wound, try to find another way to get back to the ",
        ". Piranhas are attracted to fresh ",
        " and will most likely take a bite out of your ",
        " if you ",
        " in the water!",
​        0
    ],
    "title": "How To Cross a Piranha-Infested River"
}
```
