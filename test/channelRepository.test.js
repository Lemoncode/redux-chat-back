const expect = require('chai').expect;

const channelRepository = require('../src/repositories/channelRepository');

describe('channelRepository', () => {
    describe('adding new channel with empty channelKey', () => {
        it('should avoid add channel', async () => {
            const channelKey = '';
            try {
                await channelRepository.createChannel(channelKey);
            } catch (error) {
                expect(error).equals('No value for channelKey.');
            }
        });
    });

    describe('adding new channel with null channelKey', () => {
        it('should avoid add channel', async () => {
            const channelKey = null;
            try {
                await channelRepository.createChannel(channelKey);
            } catch (error) {
                expect(error).equals('No value for channelKey.');
            }
        });
    });

    describe('adding new channel with undefined channelKey', () => {
        it('should avoid add channel', async () => {
            let channelKey;
            try {
                await channelRepository.createChannel(channelKey);
            } catch (error) {
                expect(error).equals('No value for channelKey.');
            }
        });
    });

    describe('adding new channel with white space channelKey', () => {
        it('should avoid add channel', async () => {
            const channelKey = ' ';
            try {
                await channelRepository.createChannel(channelKey);
            } catch (error) {
                expect(error).equals('No value for channelKey.');
            }
        });
    });

    describe('adding new channel to empty repository', () => {
        it('should make repository to have elements', async () => {
            await channelRepository.createChannel('foo');
            const channelList = await channelRepository.channelList();
            expect(channelList.length).to.greaterThan(0);
        });
    });

    describe('adding twice a channel to repository', () => {
        it('should avoid duplicated channel', async () => {
            await channelRepository.createChannel('comics');
            try {
                await channelRepository.createChannel('comics');
            } catch (error) {
                expect(error).equals('Channel comics already exist.');
            }
        });
    });

    describe('adding a user with empty userId', () => {
        it('should avoid insert user', async () => {
            const userId = '';
            try {
                await channelRepository.addUser('comics', userId);
            } catch (error) {
                expect(error).equals('No value for channelKey or userId');
            }
        });
    });

    describe('adding a user with null userId', () => {
        it('should avoid insert user', async () => {
            const userId = null;
            try {
                await channelRepository.addUser('comics', userId);
            } catch (error) {
                expect(error).equals('No value for channelKey or userId');
            }
        });
    });

    describe('adding a user with undefined userId', () => {
        it('should avoid insert user', async () => {
            let userId;
            try {
                await channelRepository.addUser('comics', userId);
            } catch (error) {
                expect(error).equals('No value for channelKey or userId');
            }
        });
    });

    describe('adding a user with white space userId', () => {
        it('should avoid insert user', async () => {
            const userId = ' ';
            try {
                await channelRepository.addUser('comics', userId);
            } catch (error) {
                expect(error).equals('No value for channelKey or userId');
            }
        });
    });

    describe('adding twice a user to a channel repository', () => {
        it('should avoid duplicated user', async () => {
            await channelRepository.addUser('comics', 'jai');
            try {
                await channelRepository.addUser('comics', 'jai');
            } catch (error) {
                expect(error).equals('jai already exists in this channel.');
            }
        });
    });

    describe('request messages from channel with messages', () => {
        it('should return messages', async () => {
            const message = {
                channelKey: 'comics',
                userId: 'jai',
                text: 'batman is awesome',
            };
            await channelRepository.addMessage(message);
            const messages = await channelRepository.getMessages(message.channelKey);
            expect(messages.length).to.greaterThan(0);
        });
    });

    describe('add message to non existing channel', () => {
        it('should avoid add message', async () => {
            try {
                const message = {
                    channelKey: 'no exists',
                    userId: 'jai',
                    text: 'plain text'
                };
                await channelRepository.addMessage(message);
            } catch (error) {
                expect(error).equals('Channel: no exists or User: jai does not exist.');
            }
        });
    });

    describe('not existing user adding a message to channel', () => {
        it('should avoid add message', async () => {
            try {
                const message = {
                    channelKey: 'noexist',
                    userId: 'no exists',
                    text: 'plain text'
                };
                await channelRepository.addMessage(message);
            } catch (error) {
                expect(error).equals('Channel: noexist or User: no exists does not exist.');
            }
        });
    });
});