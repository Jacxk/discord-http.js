const Request = require('../Request.js');
const Guild = require('./Guild.js');
const Message = require('./Message.js');

class Channel {
    /**
     * @constructor
     * @param id {string} The ID of a Channel to get.
     */
    constructor(id) {
        this._path = '/channels/' + id;
    }

    /**
     * Get all the channel data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                if (!err.response) return console.error(err);
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Get a message from the channel.
     * @param messageId {string} ID of the message you need to get.
     * @param toObject {boolean} Send the data as a JSON Object instead of a class.
     * @return {Promise<Message|object>}
     */
    getMessage(messageId, toObject = false) {
        this._path += '/messages/' + messageId;
        return new Promise(async resolve => this.getObject().then(async response => {
            if (toObject) return resolve(response);
            resolve(new Message(response.id, messageId));
        }));
    }

    /**
     * Get a list of messages from the channel.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a list of classes.
     * @param [limit=50] {number} Max number of messages to return (1-100).
     * @param [before] {string} Get messages before this message ID.
     * @param [after] {string} Get messages after this guild ID.
     * @param [around] {string} Get messages around this message ID.
     * @return {Promise<Array<Message>|object>}
     */
    getMessages(toObject = false, {limit, around, before, after}) {
        return new Promise(resolve => {
            Request.call('get', this._path + '/messages').then(async response => {
                if (toObject) return resolve(response);
                const messages = [];
                for (let i = 0; i < response.length; i++) {
                    await messages.push(new Message(response[i].channel_id, response[i].id));
                }
                resolve(messages);
            }).catch(err => {
                if (!err.response) return console.error(err);
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Get a list of pinned messages.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a list of classes.
     * @return {Promise<Array<Message>|object>}
     */
    getPinnedMessages(toObject = false) {
        this._path += '/pins';
        return new Promise(async resolve => this.getObject().then(async response => {
            if (toObject) return resolve(response);
            const messages = [];
            for (let i = 0; i < response.length; i++) {
                await messages.push(response[i].id);
            }
            resolve(messages);
        }));
    }

    /**
     * Get the guild the channel is in.
     * @return {Promise<Guild>}
     */
    getGuild() {
        return new Promise(resolve => this.getObject().then(response => resolve(new Guild(response.guild_id))));
    }

    /**
     * Get the ID of the current channel.
     * @return {Promise<String>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Get the name of the current channel.
     * @return {Promise<String>}
     */
    getName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.name)));
    }

    /**
     * Get the type of the current channel.
     * @param [toString=false] {boolean} Get the value as 'text', 'voice', or 'category' if true.
     * @return {Promise<string|number>}
     */
    getType(toString = false) {
        return new Promise(resolve => this.getObject().then(response => {
            if (!toString) return resolve(response.type);
            switch (response.type) {
                case 0:
                    resolve("GUILD_TEXT");
                    break;
                case 1:
                    resolve("DM");
                    break;
                case 2:
                    resolve("GUILD_VOICE");
                    break;
                case 3:
                    resolve("GROUP_DM");
                    break;
                case 4:
                    resolve("GUILD_CATEGORY");
                    break;
            }
        }));
    }

    /**
     * Get the Position of the current channel.
     * @return {Promise<number>}
     */
    getPosition() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.position)));
    }

    /**
     * Get the parent ID of the current channel.
     * @return {Promise<String>}
     */
    getParentId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.parent_id)));
    }

    /**
     * Get the topic of the current channel.
     * @return {Promise<String>}
     */
    getTopic() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.topic)));
    }

    /**
     * Get the PermissionOverwrites of the current channel.
     * @return {Promise<String>}
     */
    getPermissionOverwrites() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.permission_overwrites)));
    }

    /**
     * Get the whether the channel is nsfw or not.
     * @return {Promise<boolean>}
     */
    isNsfw() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.nsfw)));
    }
}

module.exports = Channel;