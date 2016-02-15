'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/');

const PORT = process.env.PORT || 3000;

if(production) {
  const MONGODB_URL = 'mongodb://ds039135.mongolab.com:39135/node-webserver';  
} else {
  const MONGODB_URL = 'mongodb://localhost:27017/node-webserver';
}



app.set('view engine', 'jade');

app.locals.title = 'THE Super Cool App';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

mongoose.connect(MONGODB_URL);

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});
