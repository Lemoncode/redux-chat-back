module.exports = ({ io, channel, repository }) => {
    const namespace = io.of(channel);

    namespace.on('connection', (socket) => {
        const { user } = socket.handshake.query;
        repository.addUser(channel, user)
            .then(() => {
                console.log(`Added user:${user} to channel: random`)
            })
            .catch(() => socket.disconnect());

        socket.on('messages', () => {
            console.log('messages request');
            repository.getMessages(channel)
                .then((messages) => {
                    socket.emit('messages', messages);
                })
                .catch(e => console.log(e));
        });

        socket.on('message', (message) => {
            const { channel, user, text } = message;
            const serverMessage = {
                channelKey: channel,
                userId: user,
                text,
            };

            repository.addMessage(serverMessage)
                .then(() => {
                    namespace.emit('message', message);
                })
                .catch(e => console.log(e));
        });
    });
};