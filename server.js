const express = require('express');
const scraper = require('./scraper')
const app = express();

// Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// API routes
// YouTube search
app.get('/api/search', (req, res) => {
    scraper.youtube(req.query.q, req.query.key, req.query.pageToken)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

// YouTube playlist
app.get('/api/playlist/:id', (req, res) => {
    scraper.playlist(req.params.id)
      .then(x => res.json(x))
      .catch(e => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
