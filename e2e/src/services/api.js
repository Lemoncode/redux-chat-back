import { baseUrl } from '../config';

const apiUrl = `${baseUrl}/api`;

export const fetchRooms = () => (
    fetch(`${apiUrl}/rooms`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
);

export const canenrolRoom = (roomId, userId) => {
    return fetch(`${apiUrl}/rooms/canenrol/${roomId}/user`, {
        method: 'POST',
        body: JSON.stringify({ 
            userId 
        }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    });
};