const express = require('express');
const scraper = require('./scraper')
const app = express();

//Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//API route
app.get('/api/search', (req, res) => {
    const params = {
      query: req.query.q,
      type: req.query.type,
      hl: req.query.hl,
      gl: req.query.gl
    }
    scraper.youtube(params, req.query.key, req.query.pageToken)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
