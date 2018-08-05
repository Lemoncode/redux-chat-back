const Message = require('../models/Message');
const channels = [];

channels['random'] = {
    users: [],
    messages: [],
};

channels['languages'] = {
    users: [],
    messages: [],
};

exports.channelList = () => {
    return Promise.resolve(Object.keys(channels));
};

exports.existChannel = (channelKey) => {
    return new Promise((res, _) => {
        exports.channelList().then((channelList) => {
            const found = channelList.find(c => c === channelKey);
            if (found) {
                res(true);
            } else {
                res(false);
            }
        });
    });
};

exports.createChannel = (channelKey) => {
    return new Promise((res, rej) => {
        exports.channelList()
            .then((channelList) => {
                if (!channelList.find(c => c === channelKey)) {
                    channels[channelKey] = {
                        users: [],
                        messages: [],
                    };
                    res();
                }
                rej(`Channel ${channelKey} already exist.`);
            })
    });
};

exports.existUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((res, rej) => {
        if (!existChannel) {
            rej(`${channelKey} does not exist.`);
        }

        const found = channels[channelKey].users.find(u => u === userId);
        if (found) {
            res(true);
        } else {
            res(false);
        }
    });
};

exports.addUser = async (channelKey, userId) => {
    const existChannel = await exports.existChannel(channelKey);
    return new Promise((res, rej) => {
        if (!existChannel) {
            rej(`${channelKey} does not exist.`);
        }
        exports.existUser(channelKey, userId)
            .then((exists) => {
                if (!exists) {
                    channels[channelKey].users = [...channels[channelKey].users, userId];
                    res();
                }
                rej(`${userId} already exists in this channel.`);
            });
    });
};

const canAddMessage = async (channelKey, userId) => (
    await exports.existChannel(channelKey) &&
    await exports.existUser(channelKey, userId)
);

exports.addMessage = ({ channelKey, userId, text }) => {
    return new Promise(async (res, rej) => {
        if (await canAddMessage(channelKey, userId)) {
            const message = new Message(userId, text, Date.now());
            channels[channelKey].messages = [...channels[channelKey].messages, message];
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