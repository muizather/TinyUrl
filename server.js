const express = require('express');
const app = express();
const shortid = require('shortid');
const urlDatabase = {};

app.use(express.json());
app.use(express.static('tinyurl/public')); // serve static HTML file

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/tinyurl/public/index.html');
});

app.post('/api/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const shortId = shortid.generate();
  urlDatabase[shortId] = originalUrl;
  res.json({ shortUrl: `http://localhost:3000/${shortId}` });
});

app.get('/:shortId', (req, res) => {
  const shortId = req.params.shortId;
  const originalUrl = urlDatabase[shortId];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});