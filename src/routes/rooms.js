const express = require('express');
const router = express.Router();

module.exports = (repository) => (
    router
        .get('/', async (_, res, next) => {
            try {
                const rooms = await repository.channelList();
                console.log(rooms);
                res.json(rooms);
            } catch (error) {
                next(error);
            }
        })
        .post('/canenroll/:roomId/user', async (req, res, next) => { 
            try {
                const { roomId } = req.params;
                const { userId } = req.body;
                const exists = await repository.existUser(roomId, userId);
                res.json(!exists);
            } catch (error) {
                next(error);
            }
        })
);
