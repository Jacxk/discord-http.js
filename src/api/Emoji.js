const User = require('./User.js');
const Role = require('./Role.js');

class Emoji {
    /**
     * @constructor
     * @param emojiId {String} ID of the emoji to get.
     */
    constructor(guildId, emojiId) {
        this._guildId = guildId;
        this._path = `/guild/${guildId}/emojis/${emojiId}`;
    }

    /**
     * Get all the message data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                let error = `${err.method} -- ${err.statusCode} - ${err.statusMessage}`;
                console.error(error);
            })
        });
    }

    /**
     * Get the ID of the current emoji.
     * @return {Promise<String>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Get the name of the emoji.
     * @return {Promise<String>}
     */
    getName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.name)));
    }

    /**
     * Get the roles this emoji is whitelisted to.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @return {Promise<Array<Role>|Object>}
     */
    getRoles(toObject = false) {
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response.roles);
            else {
                let roles = [];
                for (let i = 0; i < response.length; i++) roles.push({
                    reason: response.reason,
                    user: new Role(this._guildId, response[i].user.id)
                })
                resolve(roles);
            }
        }));
    }

    /**
     * Get the user who created the emoji.
     * @param [toObject] {boolean} Send the data as a JSON Object instead of a class.
     * @return {Promise<any>}
     */
    getUser(toObject = false) {
        return new Promise(resolve => this.getObject().then(response => {
            if (toObject) resolve(response.user);
            else resolve(new User(response.user.id));
        }));
    }

    /**
     * Whether the emoji must be wrapped in colons.
     * @return {Promise<Boolean>}
     */
    requiresColons() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.require_colons)));
    }

    /**
     * Whether the emoji is managed.
     * @return {Promise<Boolean>}
     */
    isManaged() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.managed)));
    }

    /**
     * Whether the emoji is animated.
     * @return {Promise<Boolean>}
     */
    isAnimated() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.animated)));
    }
}