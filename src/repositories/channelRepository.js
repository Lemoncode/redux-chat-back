const Message = require('../models/Message');
const channels = [];

const createChannel = (channelKey) => {
    channels[channelKey] = {
        users: [],
        messages: [],
    };
};

exports.channelList = () => (
    Promise.resolve(Object.keys(channels))
);

exports.existChannel = (channelKey) => {
    return new Promise((res, _) => {
        exports.channelList().then((channelList) => {
            res(
                !!channelList.find(c => c === channelKey)
            );
        });
    });
};

exports.createChannel = async (channelKey) => {
    const channelExist = await exports.existChannel(channelKey);
    return new Promise((res, rej) => {
        if (!channelExist) {
            createChannel(channelKey);
            res();
        }
        rej(`Channel ${channelKey} already exist.`);
    });
};

exports.existUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((res, rej) => {
        if (!existChannel) {
            rej(`${channelKey} does not exist.`);
        };
        res(
            !!channels[channelKey].users.find(u => u === userId)
        );
    });
};

exports.addUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    const existUser = await exports.existUser(channelKey, userId);
    return new Promise((res, rej) => {
        if (!existChannel) {
            rej(`${channelKey} does not exist.`);
        }
        if (!existUser) {
            channels[channelKey].users = [...channels[channelKey].users, userId];
            res();
        }
        rej(`${userId} already exists in this channel.`);
    });
};

const canAddMessage = async (channelKey, userId) => (
    await exports.existChannel(channelKey) &&
    await exports.existUser(channelKey, userId)
);

exports.addMessage = async ({ channelKey, userId, text }) => {
    const canAddMessageResolve = await canAddMessage(channelKey, userId)
    return new Promise((res, rej) => {
        if (canAddMessageResolve) {
            channels[channelKey].messages = [
                ...channels[channelKey].messages,
                new Message(userId, text, Date.now())
            ];
            res();
        }
        rej(`Channel: ${channelKey} or User: ${userId} does not exist.`);
    });
};

exports.getMessages = async (channelKey) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((res, rej) => {
        if (existChannel) {
            res(channels[channelKey].messages);
        }
        rej(`${channelKey} does not exist.`);
    });
};