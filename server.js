'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
//const upload = require('multer')({dest: 'tmp/uploads'});
const multer = require('multer');
const request = require('request');
const _ = require('lodash');
const cheerio = require('cheerio');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[1]) 
      console.log(file);
    }
  })

var upload = multer({ storage: storage })
const PORT = process.env.PORT || 3000;
app.set('view engine', 'jade');

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', {
      title: 'Super Cool App',
      date: new Date()
  });
});
// Sets a header and sends a json object to the server.
// Setting the header to 'Access-Control-Allow-Origin' allows the browser to access the page/data.
app.get('/api', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send({what: 'up'});
});

app.post('/api', (req, res) => {
  console.log('please mister postman');
  const obj = _.mapValues(req.body, val => val.toUpperCase());
  res.send(obj);
  console.log(req.body);
});

// Set up to demonstrate what was happening in our ionic project where our requests were through a proxy
// Gets the weather using forecast.io
app.get('/api/weather', (req, res) => {
  const apiKey = 'da186af328648fe7e2f94de9f6998569';
  const url = `https://api.forecast.io/forecast/${apiKey} /37.8267,-122.423`;
  request.get(url, (err, response, body) => {
    if (err) throw err;

    res.header('Access-Control-Allow-Origin', '*');
    res.send(JSON.parse(body));
  });
});

app.get('/api/news', (req, res) => {
  const url = 'http://cnn.com';
  
  request.get(url, (err, response, body) => {
    if (err) throw err;

    const news = [];
    const $ = cheerio.load(body);

    news.push({
      title: $('.banner-text').text(),
      url: $('.banner-text').closest('a').attr('href')
    });

    _.range(1, 12).forEach(i => {
        news.push({
        'title': $('.cd__headline').eq(i).text(),
        'url': $('.cd__headline').eq(i).find('a').attr('href')
      });
    });

    res.send(news);
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



app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
});
  
app.get('/sendphotos', (req, res) => {
  res.render('sendphoto');
});

app.post('/sendphotos', upload.single('image'), (req, res) => {
  console.log(req.file);
  

  res.send('<h1>Thanks for contributing!</h1>')
});

app.all('*', (req, res) => {
  res.status(403);
  res.send('<h1>access denied</h1>');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on ${ PORT }.`);
});

