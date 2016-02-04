'use strict';

const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
//const upload = require('multer')({dest: 'tmp/uploads'});
const multer = require('multer');
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

