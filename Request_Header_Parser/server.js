const path = require('path');
const express = require('express');
const forwarded = require('forwarded');
const uaParser = require('ua-parser');
const accepts = require('accepts');

const publicPath = path.join(__dirname, 'public');
const app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/whoami', (req, res) => {
  const ipAddress = forwarded(req).find((ip) => /^\d/.test(ip));
  const browser = uaParser.parseUA(req.headers['user-agent']).toString();
  const language = accepts(req).language()[0];
  const os = uaParser.parseOS(req.headers['user-agent']).toString();

  res.send({
    ipAddress,
    browser,
    language,
    os,
  });
});

app.listen(3000, () => console.log('SERVER NOW RUNNING...'));