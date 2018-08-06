import ioClient from 'socket.io-client';

// TODO: Move to service.
const createSocket = (url, channel) => ioClient(`${url}/${channel}`);
// TODO: Move to service.
const messageFactory = (channel, user) => ({
    compose: (text) => ({
        channel,
        user,
        text,  
    }),
});
// TODO: Move to service
const clearElement = element => element.value = '';

document.addEventListener('DOMContentLoaded', () => {
    const socket = createSocket('http://localhost:3000', 'random-channel');
    socket.on('connect', () => console.log(socket.id));
    socket.on('error', (err) => console.log(err));
    // TODO: Listen messages from server.
    socket.on('message', (msg) => {
        console.log(msg);
    });

    const _messageFactory = messageFactory('random-channel', 'pepe');
    const sendbutton = document.getElementById('sendbutton');
    sendbutton.addEventListener('click', (evt) => {
        evt.stopPropagation();
        const textElement = document.getElementById('message');
        const message = _messageFactory.compose(textElement.value)
        clearElement(textElement);
        socket.emit('message', message); 
        // TODO: Move this code to message handler.
        const messageElement = document.createElement('p');
        messageElement.innerText = `${message.user}: ${message.text}`;
        document.getElementById('messages').appendChild(messageElement);
    });
});