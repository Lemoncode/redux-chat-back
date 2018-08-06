const assert = require('assert');
const channelRepository = require('../src/repositories/channelRepository');
// TODO: Add mocha, chai, sinon.

const channelListHasElements = async () => {
    await channelRepository.createChannel('foo');
    const channelList = await channelRepository.channelList();
    assert.equal(channelList.length > 0, true);
    console.log('pass channelListHasElements');
};

const cantCreateChannelTwice = async () => {
    await channelRepository.createChannel('comics');
    try {
        await channelRepository.createChannel('comics');
    } catch (error) {
        assert.equal(error, 'Channel comics already exist.');
        console.log('pass cantCreateChannelTwice');
    }
};

const cantAddUserTwice = async () => {
    await channelRepository.addUser('comics', 'jai');
    try {
        await channelRepository.addUser('comics', 'jai');
    } catch (error) {
        assert.equal(error, 'jai already exists in this channel.');
        console.log('pass cantAddUserTwice');
    }
};

const channelNotExistCantAddMessage = async () => {
    try {
        const message = {
            channelKey: 'no exists',
            userId: 'jai',
            text: 'plain text'
        };
        await channelRepository.addMessage(message);
    } catch (error) {
        assert.equal(error, 'Channel: no exists or User: jai does not exist.');
        console.log('pass channelNotExistCantAddMessage');
    }
};

const userIdNotExistCantAddMessage = async () => {
    try {
        const message = {
            channelKey: 'noexist',
            userId: 'no exists',
            text: 'plain text'
        };
        await channelRepository.addMessage(message);
    } catch (error) {
        assert.equal(error, 'Channel: noexist or User: no exists does not exist.');
        console.log('pass userIdNotExistCantAddMessage');
    }
};

const getMessagesFromChannel = async () => {
    const message = {
        channelKey: 'comics',
        userId: 'jai',
        text: 'batman is awesome',
    };
    await channelRepository.addMessage(message);
    const messages = await channelRepository.getMessages(message.channelKey);
    assert.equal(messages.length > 0, true);
};

(async () => {
    await channelListHasElements();
    await cantCreateChannelTwice();
    await cantAddUserTwice();
    await channelNotExistCantAddMessage();
    await userIdNotExistCantAddMessage();
    await getMessagesFromChannel();
})();