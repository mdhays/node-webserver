'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'jade');

app.get('/', (req, res) => {
  res.render('index', {
      title: 'Super Cool App',
      date: new Date()
  });
});

app.get('/hello', (req, res) => {

    const msgInABottle = '<h1>Hello World!!!!</h1>';
    console.log(req.method, req.url);
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
  console.log(req.query);
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

app.get('/random:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

  res.send(getRandomInt(+min, +max).toString());
});

// app.get('/cal') => {

// }

app.all('*', (req, res) => {
  res.status(403);
  res.send('<h1>access denied</h1>');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on ${ PORT }.`);
});


// Child process exec
// Use npm to install cal to this directory.
// Interface directly with cal
