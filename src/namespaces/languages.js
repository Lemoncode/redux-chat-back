module.exports = (io) => {
    const languages = io.of('/languages');

    languages.on('connection', (socket) => {
        console.log('connection added');
        socket.on('message', (message) => {
            console.log(socket.id, message);
            languages.emit('message', message);
        });
    });
}; 