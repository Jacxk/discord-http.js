const Request = require('../Request.js');
const User = require('./User.js');

class Guild {
    /**
     * @constructor
     * @param id {string} The ID of a Guild which the bot is in.
     */
    constructor(id) {
        this._path = '/guilds/' + id;
    }

    /**
     * Get all the guild data in one object.
     * @returns {Promise<object>}
     */
    getObject() {
        return new Promise(resolve => {
            Request.call('get', this._path).then(response => resolve(response)).catch(err => {
                let error = `GET -- ${err.status} - ${err.response.text}`;
                console.error(error);
            })
        });
    }

    /**
     * Get the guild's ID.
     * @returns {Promise<string>}
     */
    getId() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.id)));
    }

    /**
     * Get the time until a user is set to AFK.
     * @returns {Promise<number>}
     */
    getAfkTimeout() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.afk_timeout)));
    }

    getAfkChannel() {
        // TODO: Channel Class
    }

    /**
     * Get the guild's verification level.
     * @returns {Promise<number>}
     */
    getVerificationLevel() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.verification_level)));
    }

    /**
     * Get the guild's explicit content filter.
     * @returns {Promise<number>}
     */
    getExplicitContentFilter() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.explicit_content_filter)));
    }

    getEmojis() {
        // TODO: Emoji Class
    }

    /**
     * Get the owner of the guild.
     * @returns {Promise<User>}
     */
    getOwner() {
        return new Promise(resolve => this.getObject().then(response => resolve(new User(response.owner_id))));
    }

    /**
     * Get the guild's Multi-factor authentication level.
     * @returns {Promise<number>}
     */
    getMfaLevel() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.mfa_level)));
    }

    /**
     * Get guild's icon hash.
     * @returns {Promise<string>}
     */
    getIconHash() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.icon)));
    }

    /**
     * Get guild's icon url.
     * @returns {Promise<string>}
     */
    getIconUrl() {
        return new Promise(resolve => this.getObject().then(response =>
            resolve(!response.icon ? null : `https://cdn.discordapp.com/icons/${response.id}/${response.icon}.png`)
        ));
    }

    /**
     * Get guild's name.
     * @returns {Promise<string>}
     */
    getName() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.name)));
    }

    getRoles() {
        // TODO: Roles Class
    }

    /**
     * Get guild's region.
     * @returns {Promise<string>}
     */
    getRegion() {
        return new Promise(resolve => this.getObject().then(response => resolve(response.region)));
    }
}

module.exports = Guild;