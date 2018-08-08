const Message = require('../models/Message');
const { isNotDefineOrWhiteSpace } = require('../helpers');

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

exports.existChannel = (channelKey) => (
    new Promise((resolve, _) => {
        exports.channelList().then((channelList) => {
            resolve(
                !!channelList.find(c => c === channelKey)
            );
        });
    })
);

exports.createChannel = async (channelKey) => {
    const channelExist = await exports.existChannel(channelKey);
    return new Promise((resolve, reject) => {
        if (isNotDefineOrWhiteSpace(channelKey)) {
            reject('No value for channelKey.');
        }
        if (channelExist) {
            reject(`Channel ${channelKey} already exist.`);
        }
        createChannel(channelKey);
        resolve();
    });
};

exports.existUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((resolve, reject) => {
        if (!existChannel) {
            reject(`${channelKey} does not exist.`);
        };
        resolve(
            !!channels[channelKey].users.find(u => u === userId)
        );
    });
};

exports.addUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    const existUser = await exports.existUser(channelKey, userId);
    return new Promise((resolve, reject) => {
        if (
            isNotDefineOrWhiteSpace(channelKey) ||
            isNotDefineOrWhiteSpace(userId)
        ) {
            reject('No value for channelKey or userId');
        }

        if (!existChannel) {
            reject(`${channelKey} does not exist.`);
        }
        if (!existUser) {
            channels[channelKey].users = [...channels[channelKey].users, userId];
            resolve();
        }
        reject(`${userId} already exists in this channel.`);
    });
};

const canAddMessage = async (channelKey, userId) => (
    await exports.existChannel(channelKey) &&
    await exports.existUser(channelKey, userId)
);

exports.addMessage = async ({ channelKey, userId, text }) => {
    const canAddMessageResolved = await canAddMessage(channelKey, userId)
    return new Promise((resolve, reject) => {
        if (canAddMessageResolved) {
            channels[channelKey].messages = [
                ...channels[channelKey].messages,
                new Message(userId, text, Date.now())
            ];
            resolve();
        }
        reject(`Channel: ${channelKey} or User: ${userId} does not exist.`);
    });
};

exports.getMessages = async (channelKey) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((resolve, reject) => {
        if (existChannel) {
            resolve(channels[channelKey].messages);
        }
        reject(`${channelKey} does not exist.`);
    });
};