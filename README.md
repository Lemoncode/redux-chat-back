# redux-chat-back

## Summary

* This solution works with `express` in combination with `socket.io`.

## Start API

* To start the main API on development mode from root solution folder.
* The `API`, will run in `localhost`, `port:3000`.
* The protocol for API is `http`.

```bash
$ npm start
```

## Funtcional Test API

### To test `echo` with server, from `e2e` as root folder run:

```bash
$ npm run start:echo
```

* This will start up the `client` and the `API`.
* Open the client on browser: `http://localhost:1234/`
* Type and send message, in browser console must appear:
    - `/random-channel#79PVp22K8iHx6tTCAAAA` This identifies the socket.io namespace and socket id 
    - `{channel: "random-channel", user: "pepe", text: "your text..."}` The message that we sent to server, and it's sending back to us. Just an echo.

### To test `API` with `client`, we need to open two separate node processes. First we have to run the server, from root folder:

```bash
$ npm start
```
* The `API`, will run in `localhost`, `port:3000`.

* Once server is up and running, we can launch client, from `e2e` folder run
```bash
$ npm run start:client
```

* The `client`, will run in `localhost`, `port:1234`