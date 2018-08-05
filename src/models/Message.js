module.exports = class Message {
    constructor(userId, text, timestamp) {
        this.userId = userId;
        this.text = text;
        this.timestamp = timestamp;
    }

    static fromJSON(json) {
        const { userId, text, timestamp } = JSON.parse(json);
        return new Message(userId, text, timestamp);
    }

    get JSON() {
        return JSON.stringify({
            userId: this.userId,
            text: this.text,
            timestamp: this.timestamp
        });
    }
}