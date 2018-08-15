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

export const canenrollRoom = (roomId, userId) => {
    return fetch(`${apiUrl}/rooms/canenroll/${roomId}/user`, {
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