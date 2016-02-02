'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => {

    const msgInABottle = '<h1>Hello World!!!!</h1>';
    
    console.log(req.method, req.url);
    res.writeHead(200, {
      'Content-type': 'text/html'
    });

    msgInABottle.split('').forEach((char, i) => {
      const events = [];
      setTimeout(() => {
        res.write(char);
        events.pop();
        console.log(char);
    }, 1000 * i);
      events.push(i)
  });

  setTimeout(() => {
    res.end();
  }, 25000);
});

app.get('/random', (req, res) => {
    res.end(Math.random().toString());
});

app.all('*', (req, res) => {
  res.status(403);
  res.send('<h1>access denied</h1>');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on ${ PORT }.`);
});