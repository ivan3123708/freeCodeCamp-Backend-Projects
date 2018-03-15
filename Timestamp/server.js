const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.get('/:date', (req, res) => {

  const date = req.params.date;
  let dateUnix;
  let dateNatural;

  if (/^(\d){10}$/g.test(date)) {
    dateUnix = date;
    dateNatural = new Date(date * 1000).getFullYear();
  } else {
    dateUnix = new Date(date).getTime() / 1000;
    dateNatural = date;
  }

  res.send({
    unix: dateUnix,
    natural: dateNatural
  });
});

app.listen(3000, () => console.log('SERVER NOW RUNNING...'));