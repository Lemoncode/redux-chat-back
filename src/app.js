const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  repository = require('./repositories/channelRepository'),
  genericNamespace = require('./namespaces');

const { channels } = require('./config');

const initiailizeChannels = async (io, channels, repository) => {
  await Promise.all(
    channels.map(c => repository.createChannel(c))
  );
  channels.map(c => ({
    io,
    channel: c,
    repository
  }))
  .forEach(i => genericNamespace(i));
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const roomsRouter = require('./routes/rooms')(repository);
app.use('/api/rooms', roomsRouter);

const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);
// TODO: Create env variable to initialize repository in memomory
initiailizeChannels(io, channels, repository);