const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  repsitory = require('./repositories/channelRepository'),
  // languages = require('./namespaces/languages');
  cors = require('cors')
  random = require('./namespaces/random');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const roomsRouter = require('./routes/rooms')(repsitory);
app.use('/api/rooms', roomsRouter);

const server = require('http').Server(app);
const io = require('socket.io')(server);
random(io);
server.listen(3000);