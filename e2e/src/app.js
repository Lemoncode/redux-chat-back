import { createSocket, messageFactory } from './services/channel';
import {
    clearMessageText,
    addMessageText,
    populateRooms,
    changeSelectedRoom,
    userInputValue,
    selectedRoomValue
} from './services/uiHelpers';
import { fetchRooms, canenrolRoom } from './services/api';
import { baseUrl } from './config';

const socketEventsHandler = (socket) => {
    socket.on('connect', () => {
        console.log(socket.id);
        socket.emit('messages');
    });
    socket.on('error', (err) => console.log(err));
    socket.on('disconnect', () => console.log('disconnected'))

    socket.on('message', (msg) => {
        addMessageText('messages', 'p', msg);
        const textElement = document.getElementById('message');
        clearMessageText(textElement);
    });
    socket.on('messages', (msgs) => {
        // TODO: Print messages.
        console.log('messages', msgs);
    });
};

const handleSelectedRoom = () => {
    // TODO: Bear on mind to disconnect from socket channel.
    document.getElementById('rooms')
        .addEventListener('click', (evt) => {
            evt.stopPropagation();
            changeSelectedRoom('selectedroom', evt.target.innerHTML);
        });
};

// Use a promise instead a callback.
const handleEnrolment = (callback) => {
    // TODO: Check selected room.
    // TODO: Check input user.
    document.getElementById('enrolmentsubmit')
        .addEventListener('click', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            const room = selectedRoomValue('selectedroom');
            const userId = userInputValue('userid');
            canenrolRoom(
                room,
                userId,
            ).then((canenrol) => {
                if (canenrol) {
                    callback(null, room, userId);
                } else {
                    callback('can enrol to this channel');
                }
            }
            ).catch(e => console.log(e));
        });
};

const handleSender = (socket, room, user) => {
    const _messageFactory = messageFactory(room, user);
    document.getElementById('sendbutton')
        .addEventListener('click', (evt) => {
            evt.stopPropagation();
            const textElement = document.getElementById('message');
            const message = _messageFactory.compose(textElement.value)
            socket.emit('message', message);
        });
};

document.addEventListener('DOMContentLoaded', () => {
    let socket;
    fetchRooms()
        .then((rooms) => {
            populateRooms(rooms, 'rooms');
            handleSelectedRoom();
        })
        .catch(e => console.log(e));

    handleEnrolment((err, room, userId) => {
        if (!err) {
            const socketParams = {
                url: baseUrl,
                channel: room,
                options: {
                    query: `user=${userId}`
                },
            };
            socket = createSocket(socketParams);
            socketEventsHandler(socket);
            handleSender(socket, room, userId);
        }
    });
});