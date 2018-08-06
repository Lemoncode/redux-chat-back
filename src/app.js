const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors')
  random = require('./namespaces/random');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);
random(io);
server.listen(3000);