const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  repository = require('./repositories/channelRepository'),
  cors = require('cors')
  random = require('./namespaces/random');

  const { channels } = require('./config');

// TODO: Use environment variables
const initiailizeChannels = async (channels, repository) => {
  await Promise.all(
    channels.map(c => repository.createChannel(c))
  );
}; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const roomsRouter = require('./routes/rooms')(repository);
app.use('/api/rooms', roomsRouter);

const server = require('http').Server(app);
const io = require('socket.io')(server);
random(io);
server.listen(3000);
// TODO: Create env variable to initialize repository in memomory
initiailizeChannels(channels, repository);