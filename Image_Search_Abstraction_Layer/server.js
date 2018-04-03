const path = require('path');
const fs = require('fs');
const express = require('express');
const GoogleImages = require('google-images');

const publicPath = path.join(__dirname, 'public');
const app = express();

const CSE_ID = '006925503952955077495:2d5jgornxia';
const API_KEY = 'AIzaSyAKtP3FYZfgixgNnk7X3uE-LRSX7KXESJk';
const client = new GoogleImages(CSE_ID, API_KEY);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  const page = req.query.offset || 1;

  client.search(searchTerm, { page })
    .then((data) => {
      const images = data.map((image) => {
        return {
          description: image.description,
          url: image.url,
          thumbnail: image.thumbnail.url,
          parentPage: image.parentPage
        }
      });

      res.send(images);
    });

  const searchRecord = {
    term: searchTerm,
    when: new Date().toString()
  };

  const logFile = fs.readFileSync('./log.json');
  const log = JSON.parse(logFile);

  log.unshift(searchRecord);

  fs.writeFileSync('log.json', JSON.stringify(log));
});

app.get('/api/recent', (req, res) => {
  fs.readFile('./log.json', (err, dataFile) => {
    if (err) throw err;

    const data = JSON.parse(dataFile);
    const len = data.length < 10 ? data.length : 10;
    const log = [];

    for (let i = 0; i < len; i++) {
      log.push(data[i]);
    };

    res.send(log);
  });
});

app.listen(3000, () => console.log('SERVER NOW RUNNING...'));