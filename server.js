const express = require('express');
const scraper = require('./scraper');
const app = express();

//Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
//API route
app.get('/api/search', (req, res) => {
    // Specify YouTube search url
    if (!req.query.page) {
        scraper.getYouTubeResults(req.query.q).then(j=>res.json(j)).catch(e=>res.send(e));
    }else{
        scraper.getYouTubeResults(req.query.q, req.query.page).then(j=>res.json(j)).catch(e=>res.send(e));
    }
     
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
