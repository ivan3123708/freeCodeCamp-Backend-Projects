const path = require('path');
const express = require('express');
const moment = require('moment');

const publicPath = path.join(__dirname, 'public');
const app = express();

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/:date', (req, res) => {

  const date = req.params.date;
  let dateUnix;
  let dateNatural;

  if (/^\d*$/.test(date)) {
    dateUnix = parseInt(date);
    dateNatural = moment(parseInt(date * 1000)).format('MMM D, YYYY')
  } else {
    dateUnix = new Date(date).getTime() / 1000 || null;
    dateNatural = dateUnix ? date : null;
  }

  res.send({
    unix: dateUnix,
    natural: dateNatural
  });
});

app.listen(3000, () => console.log('SERVER NOW RUNNING...'));