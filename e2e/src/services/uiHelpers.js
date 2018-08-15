export const clearMessageText = (element) => element.value = '';

export const addMessageText = (containerId, tag, message) => {
    const messageElement = document.createElement(tag);
    messageElement.innerText = `${message.user}: ${message.text}`;
    document.getElementById(containerId).appendChild(messageElement);
};

const createRoomItem = (roomName) => {
    const roomItem = document.createElement('li');
    roomItem.innerText = roomName;
    return roomItem;
};

export const populateRooms = (rooms, elementId) => {
    const roomsContainer = document.getElementById(elementId);
    const roomItems = rooms.map(createRoomItem);
    roomItems.forEach((ri) => roomsContainer.appendChild(ri));
};

export const changeSelectedRoom = (selectedRoomId, value) => {
    document.getElementById(selectedRoomId).innerText = value;
};

export const selectedRoomValue = (selectedRoomId) => (
    document.getElementById(selectedRoomId).innerHTML
);

export const userInputValue = (userId) => (
    document.getElementById(userId).value
);